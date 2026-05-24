const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database();

/**
 * 摄影助手对话云函数
 * 调用LLM API进行摄影知识问答
 */
exports.main = async (event, context) => {
  const { message, userId, conversationId } = event;

  if (!message) {
    return {
      success: false,
      error: '消息不能为空'
    };
  }

  try {
    // 1. 获取对话历史
    let history = [];
    if (conversationId) {
      const historyData = await getConversationHistory(conversationId);
      if (historyData) {
        history = historyData.messages || [];
      }
    }

    // 2. 构建提示词（注入摄影领域知识）
    const systemPrompt = buildSystemPrompt();
    const fullPrompt = buildFullPrompt(systemPrompt, history, message);

    // 3. 调用LLM API
    const llmResponse = await callLLM(fullPrompt);

    // 4. 保存对话记录
    const convId = conversationId || generateConversationId();
    await saveConversation(convId, userId, message, llmResponse);

    return {
      success: true,
      data: {
        reply: llmResponse,
        conversationId: convId
      }
    };

  } catch (err) {
    console.error('对话失败:', err);
    return {
      success: false,
      error: err.message || '回复失败'
    };
  }
};

/**
 * 构建系统提示词
 */
function buildSystemPrompt() {
  return `你是摄影智评小程序的AI助手，专注于为摄影爱好者提供帮助。

你的能力：
1. 解答摄影基础知识（构图、光线、色彩、曝光等）
2. 提供拍摄技巧和建议
3. 分析作品优缺点，给出改进建议
4. 推荐学习路径和参考资源

回复风格：
- 专业但友好，像朋友聊天
- 鼓励式反馈，保护创作热情
- 适当使用emoji增加趣味性
- 回答简洁有力，避免长篇大论

当用户发送图片时，主动询问拍摄场景和意图再进行分析。`;
}

/**
 * 构建完整对话上下文
 */
function buildFullPrompt(systemPrompt, history, newMessage) {
  let prompt = `系统: ${systemPrompt}\n\n`;

  // 添加历史对话
  history.forEach(msg => {
    prompt += `${msg.role === 'user' ? '用户' : '助手'}: ${msg.content}\n`;
  });

  // 添加新消息
  prompt += `用户: ${newMessage}\n助手:`;

  return prompt;
}

/**
 * 调用LLM API
 */
async function callLLM(prompt) {
  // TODO: 配置LLM API密钥
  // 环境变量: LLM_API_KEY, LLM_API_ENDPOINT
  const API_KEY = process.env.LLM_API_KEY;
  const ENDPOINT = process.env.LLM_API_ENDPOINT || 'https://api.minimax.chat/v1/text/chatcompletion_pro';

  if (!API_KEY) {
    console.warn('未配置LLM API密钥，返回模拟回复');
    return getMockResponse(prompt);
  }

  // 实际调用LLM API的逻辑
  // 根据你选择的LLM服务实现
  // 这里以MiniMax为例
  try {
    const response = await wxCloudRequest({
      url: ENDPOINT,
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: {
        model: 'abab6-chat',
        messages: [{ role: 'user', content: prompt }]
      }
    });

    return response.choices[0].message.content;
  } catch (err) {
    console.error('LLM调用失败:', err);
    return getMockResponse(prompt);
  }
}

/**
 * 获取模拟回复（临时使用）
 */
function getMockResponse(prompt) {
  const userMessage = prompt.split('用户:').pop().split('\n助手:')[0].trim();

  // 基于用户问题返回模拟回复
  if (userMessage.includes('构图')) {
    return '构图是摄影的灵魂！常用的构图法则有：\n\n📐 三分法：将画面分成九宫格，主体放在交叉点上\n🟢 黄金比例：让主体处于画面0.618的位置\n📖 框架构图：利用门窗等元素形成自然框架\n\n你想了解哪种构图方式的具体应用？';
  }

  if (userMessage.includes('光线') || userMessage.includes('曝光')) {
    return '光线是摄影的灵魂！\n\n☀️ 黄金时段：日出后1小时、日落前1小时，光线柔和有层次\n🌅 逆光拍摄：可以拍出轮廓光和剪影效果\n💡 阴天光线：柔和均匀，适合拍人像\n\n你是在什么场景下拍摄呢？';
  }

  if (userMessage.includes('人像')) {
    return '人像摄影的几个小技巧：\n\n👤 焦段选择：50mm定焦适合入门，虚化效果好\n💄 眼神交流：引导模特看向镜头或远方\n🎨 背景简洁：让主体更突出\n☀️ 光线：侧光或逆光更有氛围感\n\n需要我推荐几个人像摄影的经典姿势吗？';
  }

  if (userMessage.includes('相机') || userMessage.includes('镜头')) {
    return '新手入门推荐：\n\n📷 入门级：索尼A6400、富士X-T30 II\n📸 中级：索尼A7M4、佳能R6\n🎯 镜头：先从一个50mm定焦开始练习\n\n你的预算是多少？我可以给你更具体的推荐！';
  }

  // 默认回复
  return '你好！我是摄影助手，有什么摄影问题都可以问我~\n\n可以问我：\n📚 摄影基础知识\n📷 器材推荐\n💡 拍摄技巧\n🖼️ 作品分析';
}

/**
 * 获取对话历史
 */
async function getConversationHistory(conversationId) {
  try {
    const result = await db.collection('chat_history')
      .where({ conversationId: conversationId })
      .get();

    return result.data[0] || null;
  } catch (err) {
    console.error('获取对话历史失败:', err);
    return null;
  }
}

/**
 * 保存对话记录
 */
async function saveConversation(conversationId, userId, userMessage, botReply) {
  try {
    const now = new Date();

    // 尝试更新现有对话
    const existResult = await db.collection('chat_history')
      .where({ conversationId: conversationId })
      .count();

    if (existResult.total > 0) {
      await db.collection('chat_history')
        .where({ conversationId: conversationId })
        .update({
          data: {
            messages: db.command.push([{
              role: 'user',
              content: userMessage,
              timestamp: now
            }, {
              role: 'assistant',
              content: botReply,
              timestamp: now
            }]),
            updatedAt: now
          }
        });
    } else {
      // 创建新对话
      await db.collection('chat_history').add({
        data: {
          conversationId: conversationId,
          userId: userId || 'anonymous',
          messages: [{
            role: 'user',
            content: userMessage,
            timestamp: now
          }, {
            role: 'assistant',
            content: botReply,
            timestamp: now
          }],
          createdAt: now,
          updatedAt: now
        }
      });
    }
  } catch (err) {
    console.error('保存对话失败:', err);
  }
}

/**
 * 生成对话ID
 */
function generateConversationId() {
  return 'conv_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

/**
 * wx.request 替代（云函数内使用）
 */
function wxCloudRequest(options) {
  return new Promise((resolve, reject) => {
    const http = options.url.startsWith('https') ? https : http;

    const req = http.request(options.url, {
      method: options.method,
      headers: options.headers
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(e);
        }
      });
    });

    req.on('error', reject);
    if (options.body) {
      req.write(JSON.stringify(options.body));
    }
    req.end();
  });
}