// 话题详情页
Page({
  data: {
    topic: null,
    previewImage: null  // 当前预览图片
  },

  onLoad(options) {
    const { categoryId, topicId } = options;
    console.log('topic params:', categoryId, topicId);
    this.loadTopicContent(categoryId, topicId);
  },

  // 图片预览
  previewImage(e) {
    const url = e.currentTarget.dataset.url;
    wx.previewImage({
      current: url,
      urls: [url]
    });
  },

  loadTopicContent(categoryId, topicId) {
    // 解析字符串参数
    const catId = parseInt(categoryId, 10);
    const topId = parseInt(topicId, 10);
    const allTopics = {
      // 基础入门
      '1-1': {
        title: '相机基本操作',
        category: '基础入门',
        icon: '◐',
        duration: '15分钟',
        level: '入门',
        content: `了解相机的各个部件和基本操作，是迈向摄影的第一步。

【主要部件】
• 镜头：捕捉光线，决定视角和景深
• 快门：控制光线进入的时间
• 光圈：控制光线进入的量
• 对焦系统：确保主体清晰
• 取景器/液晶屏：构图的窗口

【拍摄模式】
• P（程序自动）：相机自动设置
• A/Av（光圈优先）：你控光圈，相机算快门
• S/Tv（快门优先）：你控快门，相机算光圈
• M（手动模式）：完全由你控制

【基础练习】
1. 熟悉各个按键位置
2. 切换不同拍摄模式
3. 尝试调整光圈和快门
4. 观察取景器里的参数变化`,
        tips: ['先从P模式开始熟悉', '不要害怕使用手动模式', '多拍多练是掌握相机的关键'],
        images: [
          { url: 'https://miniprogram-1320062640.cos.ap-nanjing.myqcloud.com/1.jpg', caption: '相机正面各部件示意图' },
          { url: 'https://miniprogram-1320062640.cos.ap-nanjing.myqcloud.com/2.jpg', caption: '模式转盘各档位说明' }
        ]
      },
      '1-2': {
        title: '曝光三要素',
        category: '基础入门',
        icon: '◐',
        duration: '20分钟',
        level: '入门',
        content: `光圈、快门、ISO三者共同控制曝光，决定照片的明暗。

【光圈值 F】
• 数字越小，光圈越大，进光越多
• 大光圈（F1.4-F2.8）：背景虚化，人像首选
• 小光圈（F8-F16）：风景清晰，锐度高
• 例：F1.8 比 F8 进光多16倍

【快门速度】
• 数字越大，快门越快，进光越少
• 高速快门（1/500s+）：定格瞬间，运动摄影
• 慢速快门（1/30s以下）：记录轨迹，需要三脚架
• 手持安全快门：焦段的倒数（如50mm镜头用1/50s以上）

【ISO感光度】
• ISO越低，画质越纯净
• ISO越高，噪点越多
• 常用范围：晴天100-200，阴天400-800，夜间1600+

【三者关系】
光圈大一档 = 快门快一档 = ISO低一档 = 相同曝光`,
        tips: ['阳光16法则：F16、ISO100、快门倒数', '画质优先用低ISO', '先固定ISO，再调整光圈快门'],
        images: [
          { url: 'https://miniprogram-1320062640.cos.ap-nanjing.myqcloud.com/3.jpg', caption: '光圈大小对景深的影响对比' },
          { url: 'https://miniprogram-1320062640.cos.ap-nanjing.myqcloud.com/4.jpg', caption: '快门速度定格与动态模糊效果' }
        ]
      },
      '1-3': {
        title: '对焦与景深',
        category: '基础入门',
        icon: '◐',
        duration: '15分钟',
        level: '入门',
        content: `理解对焦原理和景深控制，是拍出好照片的基础。

【对焦模式】
• 单次对焦（AF-S）：对焦一次锁定，适合静止主体
• 连续对焦（AF-C）：持续跟踪对焦，适合运动主体
• 手动对焦（MF）：精确控制，可用于微距

【对焦点选择】
• 单点对焦：精确锁定目标
• 区域对焦：覆盖小范围
• 广域对焦：覆盖大范围

【景深三要素】
• 光圈：光圈越大景深越浅
• 焦距：焦距越长景深越浅
• 拍摄距离：距离越近景深越浅

【虚化技巧】
1. 开大光圈（F1.8-F2.8）
2. 使用长焦镜头（85mm以上）
3. 靠近主体
4. 主体远离背景`,
        tips: ['拍人像用F1.8-F2.8', '风光用F8-F11获得最大清晰度', '对焦点选在眼睛或主体上'],
        images: [
          { url: 'https://miniprogram-1320062640.cos.ap-nanjing.myqcloud.com/5.jpg', caption: '大光圈虚化背景人像效果' },
          { url: 'https://miniprogram-1320062640.cos.ap-nanjing.myqcloud.com/6.jpg', caption: '小光圈风光前后景清晰' }
        ]
      },
      '1-4': {
        title: '白平衡与色彩',
        category: '基础入门',
        icon: '◐',
        duration: '12分钟',
        level: '入门',
        content: `白平衡决定照片的色温，正确设置可还原真实色彩或营造特定氛围。

【白平衡模式】
• 自动（AWB）：相机自动判断，适合大多数场景
• 日光（5200K）：晴天室外，色彩偏暖
• 阴天（6000K）：阴天使用，稍偏暖
• 阴影（7000K）：有阴影的场景
• 白炽灯（3200K）：室内钨丝灯，偏黄
• 荧光灯（4000K）：荧光灯照明

【K值调节】
• 数值越低越偏蓝（冷色调）
• 数值越高越偏黄（暖色调）
• 创意调整：日出用低K值保留暖色，夜景用高K值还原白色

【色彩风格】
• 冷色调：蓝色为主，给人冷静感
• 暖色调：黄橙为主，给人温暖感
• 中性：还原真实色彩`,
        tips: ['RAW格式可后期调整白平衡', '阴天可以往暖色偏移补偿', '黑白摄影不受白平衡影响'],
        images: [
          { url: 'https://miniprogram-1320062640.cos.ap-nanjing.myqcloud.com/7.jpg', caption: '不同白平衡设置下的色彩对比' },
          { url: 'https://miniprogram-1320062640.cos.ap-nanjing.myqcloud.com/8.jpg', caption: '暖色调与冷色调人像效果' }
        ]
      },

      // 构图法则
      '2-1': {
        title: '三分法',
        category: '构图法则',
        icon: '◇',
        duration: '10分钟',
        level: '入门',
        content: `三分法是最经典、最易用的构图法则。

【原理】
将画面横竖各分成三等份，形成4个交叉点。将主体放在这些交叉点或线上，比居中构图更有张力。

【使用方法】
• 人物放在左侧或右侧三分线上
• 风景照的地平线放在上1/3或下1/3
• 建筑垂直于三分线

【注意事项】
• 不是所有场景都适用
• 灵活运用，不要死板
• 三分法是起点，不是终点

【练习建议】
1. 开启相机网格线
2. 有意识地练习3周
3. 观察优秀作品的三分法应用`,
        tips: ['人像摄影：眼睛放在上三分线', '风光摄影：地平线放上1/3或下1/3', '打破规则有时效果更好'],
        images: [
          { url: 'https://miniprogram-1320062640.cos.ap-nanjing.myqcloud.com/9.jpg', caption: '三分法构图示意图' },
          { url: 'https://miniprogram-1320062640.cos.ap-nanjing.myqcloud.com/1.jpg', caption: '人像三分法应用示例' }
        ]
      },
      '2-2': {
        title: '黄金分割',
        category: '构图法则',
        icon: '◇',
        duration: '12分钟',
        level: '进阶',
        content: `黄金分割是自然界最美的比例，约1:1.618。

【历史背景】
• 源自古希腊数学
• 广泛应用于艺术、建筑、设计
• 蒙娜丽莎、帕特农神庙都用到黄金比例

【构图方法】
• 黄金螺旋：引导视线到主体
• 黄金矩形：类似三分法但比例更和谐
• 黄金三角：对角线分割画面

【应用场景】
• 人像：脸部在螺旋中心
• 风光：主体沿螺旋分布
• 产品：黄金矩形内构图

【与三分法的区别】
• 三分法：网格均匀分布
• 黄金分割：比例更自然优美
• 可以互相结合使用`,
        tips: ['可用相机网格线辅助', '黄金螺旋适合引导视线', '不要过度依赖，任何规则都有例外'],
        images: [
          { url: 'https://miniprogram-1320062640.cos.ap-nanjing.myqcloud.com/2.jpg', caption: '黄金分割螺旋构图示例' },
          { url: 'https://miniprogram-1320062640.cos.ap-nanjing.myqcloud.com/3.jpg', caption: '黄金矩形在风光摄影中的应用' }
        ]
      },
      '2-3': {
        title: '对角线构图',
        category: '构图法则',
        icon: '◇',
        duration: '10分钟',
        level: '入门',
        content: `对角线构图能引导视线、增强动感，是经典构图法之一。

【特点】
• 利用画面对角线分布元素
• 引导观者视线方向
• 创造动感和张力
• 打破水平垂直的呆板

【常见应用】
• 道路、河流延伸
• 建筑轮廓线
• 人体姿态
• 树枝、云彩

【拍摄技巧】
1. 寻找画面中的线条
2. 让线条沿对角线分布
3. 保持线条的连续性
4. 避免过多杂乱线条

【进阶用法】
• 对角线交叉：增强交汇感
• 多条对角线：创造动感冲击
• 与三分法结合：将对角线起点放在三分点`,
        tips: ['后期可以适当裁剪强化对角线', '线条越纯粹效果越好', '桥梁、建筑是好素材'],
        images: [
          { url: 'https://miniprogram-1320062640.cos.ap-nanjing.myqcloud.com/4.jpg', caption: '对角线构图引导视线示意' },
          { url: 'https://miniprogram-1320062640.cos.ap-nanjing.myqcloud.com/5.jpg', caption: '道路对角线构图增加纵深感' }
        ]
      },
      '2-4': {
        title: '框架构图',
        category: '构图法则',
        icon: '◇',
        duration: '10分钟',
        level: '入门',
        content: `利用前景形成自然框架，引导视线聚焦主体。

【框架类型】
• 门框、窗户
• 树枝、树叶
• 拱门、隧道
• 人物、建筑轮廓

【构图要点】
• 框架作为前景出现
• 框架边缘要清晰
• 框架与主体形成对比
• 框架不必完整

【视觉原理】
• 框架形成引导线
• 制造纵深感
• 增加层次和深度
• 突出主体存在感

【注意事项】
• 框架不能太杂乱
• 框架要简洁有力
• 与三分法结合效果更佳
• 虚实结合增加层次`,
        tips: ['框架可以是实的也可以是虚的', '树叶、拱门是常见的自然框架', '后期可以添加框架效果'],
        images: [
          { url: 'https://miniprogram-1320062640.cos.ap-nanjing.myqcloud.com/6.jpg', caption: '门框框架构图示例' },
          { url: 'https://miniprogram-1320062640.cos.ap-nanjing.myqcloud.com/7.jpg', caption: '树叶框架聚焦主体' }
        ]
      },

      // 光线运用
      '3-1': {
        title: '自然光',
        category: '光线运用',
        icon: '☀',
        duration: '15分钟',
        level: '入门',
        content: `自然光是摄影最基本的光源，掌握它的变化是必修课。

【日光的变化】
• 清晨（6-8点）：柔和暖色，光线低，阴影长
• 上午（9-11点）：逐渐变白，阴影较短
• 正午（12-14点）：顶光强烈，不适合人像
• 下午（15-17点）：光线角度好，色彩偏暖
• 黄昏（18-19点）：金黄暖色，光线角度低

【天气影响】
• 晴天：方向明确，有直射光
• 阴天：漫射光，各个方向均匀
• 多云：层次丰富，光线柔和

【拍摄建议】
1. 利用好黄金时段
2. 阴天适合拍人像
3. 避免正午强光
4. 注意光线方向`,
        tips: ['日出后1小时、日落前1小时是最佳时段', '阴天光线均匀，适合新手', '用反光板补阴影'],
        images: [
          { url: 'https://miniprogram-1320062640.cos.ap-nanjing.myqcloud.com/8.jpg', caption: '清晨黄金时段光线效果' },
          { url: 'https://miniprogram-1320062640.cos.ap-nanjing.myqcloud.com/9.jpg', caption: '阴天漫射光柔和均匀' }
        ]
      },
      '3-2': {
        title: '人造光',
        category: '光线运用',
        icon: '☀',
        duration: '20分钟',
        level: '进阶',
        content: `人造光让你在任何时候都能控制光线。

【常见人造光源】
• 影室闪光灯：专业，强力可调
• 持续光源：所见即所得
• LED补光灯：轻便，可调色温
• 常亮灯：视频必备

【布光基础】
• 主光：主要照明，决定基调
• 辅光：补充阴影
• 轮廓光：分离主体与背景
• 背景光：照亮背景

【基本灯位】
• 45度侧光：经典人像
• 90度侧光：戏剧效果
• 逆光：轮廓光
• 正面光：平坦无趣

【DIY方法】
• 用窗帘柔光
• 白色床单反光
• 镜子反光补光
• 书本做简易反光板`,
        tips: ['从一只灯开始练习', '先固定灯位再微调', '反光板比灯更重要'],
        images: [
          { url: 'https://miniprogram-1320062640.cos.ap-nanjing.myqcloud.com/1.jpg', caption: '单灯45度侧光人像布光示意' },
          { url: 'https://miniprogram-1320062640.cos.ap-nanjing.myqcloud.com/2.jpg', caption: '室内双灯布光效果' }
        ]
      },
      '3-3': {
        title: '逆光摄影',
        category: '光线运用',
        icon: '☀',
        duration: '12分钟',
        level: '进阶',
        content: `逆光可以创造出独特的艺术效果。

【逆光类型】
• 正逆光：主体在光源正对面
• 侧逆光：光源在侧后方
• 轮廓光：强调边缘线条

【拍摄效果】
• 剪影效果：主体全黑，轮廓清晰
• 轮廓光：边缘发亮，立体感强
• 氛围感：柔和朦胧，梦幻感

【曝光技巧】
1. 点测光在主体上
2. 使用曝光补偿减档
3. 遇强光要对暗部曝光
4. 利用遮光罩防眩光

【注意事项】
• 使用遮光罩减少眩光
• 适度过曝可以增加氛围
• 后期调整可以挽救`,
        tips: ['拍剪影对亮部曝光', '轮廓光需要适度过曝', '阴天逆光效果更柔和'],
        images: [
          { url: 'https://miniprogram-1320062640.cos.ap-nanjing.myqcloud.com/3.jpg', caption: '逆光剪影效果' },
          { url: 'https://miniprogram-1320062640.cos.ap-nanjing.myqcloud.com/4.jpg', caption: '轮廓光勾勒主体边缘' }
        ]
      },
      '3-4': {
        title: '黄金时段',
        category: '光线运用',
        icon: '☀',
        duration: '10分钟',
        level: '入门',
        content: `日出日落前后的黄金时段是摄影师的最爱。

【时间定义】
• 日出前30分钟至日出后30分钟
• 日落前30分钟至日落后30分钟
• 因季节和地理位置不同而变化

【光线特点】
• 色温低，呈金黄色
• 光线角度低，阴影长
• 光质柔和，过渡自然
• 天空色彩丰富

【拍摄建议】
1. 提前到达踩点
2. 抓紧时间多拍
3. 使用三脚架
4. 不要只拍太阳

【创意玩法】
• 拍太阳轮廓
• 拍天空色彩渐变
• 利用低角度光线
• 剪影加反光板`,
        tips: ['用Weather App确认日出日落时间', '蓝调时刻也很美', '要抓紧时间，美丽转瞬即逝'],
        images: [
          { url: 'https://miniprogram-1320062640.cos.ap-nanjing.myqcloud.com/5.jpg', caption: '黄金时段日落余晖' },
          { url: 'https://miniprogram-1320062640.cos.ap-nanjing.myqcloud.com/6.jpg', caption: '蓝调时刻天空色彩' }
        ]
      },

      // 人像摄影
      '4-1': {
        title: '焦段选择',
        category: '人像摄影',
        icon: '◑',
        duration: '15分钟',
        level: '进阶',
        content: `不同焦段带来不同的人像效果。

【焦段特点】
• 35mm：环境人像，适合街拍，记录性强
• 50mm：接近人眼视角，真实自然
• 85mm：经典人像焦段，虚化优美
• 135mm：空气感强，特写专用

【焦距与距离关系】
• 35mm：需要近距离拍摄
• 50mm：保持2-3米距离
• 85mm：3-4米距离
• 135mm：需要较远距离

【选择建议】
• 室内：35mm或50mm
• 室外：85mm或135mm
• 全身照：35mm
• 特写：85mm以上

【虚化效果】
焦段越长、光圈越大、距离越近，背景虚化越明显`,
        tips: ['新手从50mm开始', '85mm被称为人像镜皇', '空间有限选35mm'],
        images: [
          { url: 'https://miniprogram-1320062640.cos.ap-nanjing.myqcloud.com/7.jpg', caption: '85mm大光圈虚化人像' },
          { url: 'https://miniprogram-1320062640.cos.ap-nanjing.myqcloud.com/8.jpg', caption: '35mm环境人像' }
        ]
      },
      '4-2': {
        title: '摆姿指导',
        category: '人像摄影',
        icon: '◑',
        duration: '18分钟',
        level: '入门',
        content: `自然地引导模特摆姿是拍好人像的关键。

【基本原则】
• 避免正面直立
• 创造不对称感
• 让身体微微倾斜
• 手不要僵硬下垂

【常用姿势】
• 站姿：重心偏移一脚
• 坐姿：身体前倾或后靠
• 靠姿：倚靠墙壁或物体
• 走姿：自然行走抓拍

【手部处理】
• 插兜：自然休闲
• 撩发：增加女性美
• 抱臂：自信干练
• 触摸：头发、脸颊、肩

【表情引导】
1. 聊天中抓拍
2. 讲笑话放松
3. 数数法
4. 播放音乐

【共通技巧】
• 让她做自己的事
• 给出具体指令
• 不断给予鼓励`,
        tips: ['给指令比说"自然点"更有效', '抓拍比摆拍自然', '多看时尚杂志学习'],
        images: [
          { url: 'https://miniprogram-1320062640.cos.ap-nanjing.myqcloud.com/9.jpg', caption: '自然站姿引导效果' },
          { url: 'https://miniprogram-1320062640.cos.ap-nanjing.myqcloud.com/1.jpg', caption: '手部插兜姿势示意' }
        ]
      },
      '4-3': {
        title: '眼神光',
        category: '人像摄影',
        icon: '◑',
        duration: '10分钟',
        level: '进阶',
        content: `眼神光是让人像照片有神的关键。

【什么是眼神光】
• 眼睛里反射的光点
• 让眼睛更有神
• 增加生命力和活力

【眼神光来源】
• 主光的反光
• 补光的反光板
• 窗户的自然光
• 闪光灯的反射

【大小位置】
• 光点大小与光源大小成正比
• 光点在10点钟或2点钟位置最佳
• 大面积眼神光柔和
• 小光点眼神锐利

【拍摄技巧】
1. 确保眼睛有足够光照
2. 避免顶光造成眼睛无神
3. 45度侧光容易产生眼神光
4. 用反光板补眼神光

【检查清单】
• 对焦点在眼睛上
• 眼神光是否明显
• 眼睛是否有神`,
        tips: ['眼神光不需要太大', '反光板是制造眼神光的利器', '与模特保持眼神交流'],
        images: [
          { url: 'https://miniprogram-1320062640.cos.ap-nanjing.myqcloud.com/2.jpg', caption: '眼神光效果对比' },
          { url: 'https://miniprogram-1320062640.cos.ap-nanjing.myqcloud.com/3.jpg', caption: '45度侧光眼神光示意' }
        ]
      },
      '4-4': {
        title: '环境人像',
        category: '人像摄影',
        icon: '◑',
        duration: '12分钟',
        level: '进阶',
        content: `环境人像强调人物与环境的融合。

【定义】
在保持人物美感的同时，展示环境特点。

【构图原则】
• 人物占比60-70%
• 环境交代背景
• 三分法构图
• 利用环境引导视线

【常用焦段】
• 35mm：交代环境
• 50mm：平衡两者
• 85mm：突出人物

【背景选择】
• 有特色的建筑
• 美丽的自然风光
• 文艺的咖啡馆
• 街头的人文景观

【虚实处理】
• 前后景虚化突出主体
• 全部清晰记录环境
• 创意虚实结合

【注意事项】
• 不要让背景抢主体
• 保持人物与背景的和谐
• 注意光线的统一性`,
        tips: ['35mm适合记录感人像', '背景要简洁不杂乱', '用大光圈虚化背景'],
        images: [
          { url: 'https://miniprogram-1320062640.cos.ap-nanjing.myqcloud.com/4.jpg', caption: '35mm环境人像示例' },
          { url: 'https://miniprogram-1320062640.cos.ap-nanjing.myqcloud.com/5.jpg', caption: '环境与人物融合效果' }
        ]
      },

      // 风光摄影
      '5-1': {
        title: '黄金时段',
        category: '风光摄影',
        icon: '◒',
        duration: '12分钟',
        level: '入门',
        content: `风光摄影必须掌握黄金时段的拍摄。

【时间窗口】
• 日出前45分钟开始准备
• 日出后30分钟结束
• 日落相反
• 蓝调时刻（日出前20分钟）也很美

【光线特点】
• 角度低，立体感强
• 色温暖，金黄或橙红
• 阴影长，有层次
• 天空色彩丰富

【拍摄准备】
1. 提前踩点
2. 查看天气
3. 准备三脚架
4. 渐变滤镜

【构图建议】
• 利用前景增加层次
• 线条引导视线
• 预留水面反光
• 不要只拍太阳

【注意事项】
• 时间短暂，提前到达
• 注意保暖和安全
• 多拍不同角度`,
        tips: ['蓝调时刻天空最蓝', '用Star Walk找星座位置', '提前1小时到达'],
        images: [
          { url: 'https://miniprogram-1320062640.cos.ap-nanjing.myqcloud.com/6.jpg', caption: '黄金时段风光整体效果' },
          { url: 'https://miniprogram-1320062640.cos.ap-nanjing.myqcloud.com/7.jpg', caption: '前景构图增加层次感' }
        ]
      },
      '5-2': {
        title: '滤镜使用',
        category: '风光摄影',
        icon: '◒',
        duration: '18分钟',
        level: '进阶',
        content: `滤镜是风光摄影的重要附件。

【常用滤镜】
• ND镜（减光镜）：减少进光量
• CPL（偏振镜）：消除反光，增强蓝天
• GND（渐变镜）：平衡明暗反差
• 暖色镜：加深日出日落的暖色

【ND镜使用】
• ND8：减3档光
• ND64：减6档光
• 适合白天长曝光
• 拍丝绢流水

【CPL镜使用】
• 旋转安装
• 消除水面反光
• 增强蓝天白云
• 水晶般透明

【GND镜使用】
• 上亮下暗
• 地平线处平衡
• 减少天空过曝
• 常用GND8

【购买建议】
• 先买CPL
• 再买ND镜
• 渐变镜看需求`,
        tips: ['CPL是最值得买的滤镜', 'ND镜要选可变ND更实用', '注意消除滤镜暗角'],
        images: [
          { url: 'https://miniprogram-1320062640.cos.ap-nanjing.myqcloud.com/8.jpg', caption: 'CPL偏振镜消除反光效果' },
          { url: 'https://miniprogram-1320062640.cos.ap-nanjing.myqcloud.com/9.jpg', caption: 'ND镜长曝光丝绢流水' }
        ]
      },
      '5-3': {
        title: '景深控制',
        category: '风光摄影',
        icon: '◒',
        duration: '15分钟',
        level: '进阶',
        content: `风光摄影中的景深控制是关键技术。

【基本原则】
• 通常需要前后景都清晰
• 大景深需要小光圈
• 超焦距对焦技巧

【参数设置】
• 光圈F8-F16
• 焦距越短越容易大景深
• 对焦点在前景1/3处

【超焦距对焦】
• 某个光圈下最远的清晰点
• 公式：对焦距离 = 焦距² / (光圈 × 弥散圈)
• 使用LCD放大确认

【创意用法】
• 前景虚化：引导视线
• 中景清晰：突出主体
• 背景虚化：简化画面

【前期技巧】
1. 使用广角镜头
2. 收小光圈F11
3. 对焦点在前景1/3
4. 确保背景清晰

【后期手段】
• Focus Stacking
• 多张合成
• 获得全面清晰`,
        tips: ['F11是最佳风光光圈', '不要过度收小光圈', '广角更容易获得大景深'],
        images: [
          { url: 'https://miniprogram-1320062640.cos.ap-nanjing.myqcloud.com/1.jpg', caption: 'F11小光圈风光整体清晰' },
          { url: 'https://miniprogram-1320062640.cos.ap-nanjing.myqcloud.com/2.jpg', caption: '前景虚化引导视线效果' }
        ]
      },
      '5-4': {
        title: '全景接片',
        category: '风光摄影',
        icon: '◒',
        duration: '15分钟',
        level: '进阶',
        content: `全景接片可以记录超广阔的画面。

【适用场景】
• 广阔风景
• 建筑全景
• 城市天际线
• 需要高像素输出

【拍摄技巧】
• 使用三脚架
• 手动曝光
• 每张重叠30-40%
• 保持同一水平线
• 从左到右或反之

【参数设置】
• 关闭自动曝光
• 关闭自动白平衡
• 手动对焦
• 同一光圈快门

【接片软件】
• PTGui：专业推荐
• Lightroom：自带接片
• Photoshop Photomerge
• Hugin：免费

【注意事项】
1. 避免使用ND滤镜
2. 避免运动物体
3. 保持一致曝光
4. 检查接片效果`,
        tips: ['拍摄时多拍一些留余量', 'PTGui是最好用的接片软件', '避免拍运动中的物体'],
        images: [
          { url: 'https://miniprogram-1320062640.cos.ap-nanjing.myqcloud.com/3.jpg', caption: '全景接片示意' },
          { url: 'https://miniprogram-1320062640.cos.ap-nanjing.myqcloud.com/4.jpg', caption: '接片软件PTGui操作界面' }
        ]
      },

      // 后期处理
      '6-1': {
        title: '基础调色',
        category: '后期处理',
        icon: '◓',
        duration: '20分钟',
        level: '入门',
        content: `后期调色是让照片从"能看"到"好看"的关键。

【基础调整项】
• 曝光：整体明暗
• 对比度：明暗反差
• 高光：亮部细节
• 阴影：暗部细节
• 白色：最亮部分
• 黑色：最暗部分

【调整顺序】
1. 先校正色温
2. 调整整体曝光
3. 恢复高光阴影
4. 增加对比度
5. 微调各参数

【核心原则】
• 宁欠勿过
• 高光不过曝
• 阴影不死黑
• 对比不过度

【参考数据】
• 曝光：±0.5以内
• 对比度：+10到+30
• 高光：-30到-70
• 阴影：+20到+50

【经验技巧】
1. 调色在100%放大下观察
2. 过曝区域会永久丢失细节
3. 参考直方图调整
4. 多对比原图`,
        tips: ['直方图是最可靠的参考', '不要相信屏幕，相信直方图', '小幅多次调整更好'],
        images: [
          { url: 'https://miniprogram-1320062640.cos.ap-nanjing.myqcloud.com/5.jpg', caption: '调色前后对比效果' },
          { url: 'https://miniprogram-1320062640.cos.ap-nanjing.myqcloud.com/6.jpg', caption: '直方图调整参考' }
        ]
      },
      '6-2': {
        title: '局部调整',
        category: '后期处理',
        icon: '◓',
        duration: '15分钟',
        level: '进阶',
        content: `局部调整让照片更有层次和重点。

【调整工具】
• 渐变滤镜：上下左右渐变
• 径向滤镜：圆形渐变
• 画笔工具：手动涂抹
• 预设蒙版：自动选择

【渐变滤镜】
• 用于天空地面平衡
• 压暗天空
• 提亮前景
• 光线引导

【径向滤镜】
• 突出主体
• 压暗边缘
• 局部提亮
• 柔化局部

【画笔工具】
• 精细调整区域
• 加深减淡
• 局部锐化
• 去除瑕疵

【常用场景】
1. 压暗天空
2. 提亮主体
3. 局部对比度
4. 局部饱和度`,
        tips: ['从全局调整再到局部', '画笔工具要开大羽化', '局部调整是拉开差距的关键'],
        images: [
          { url: 'https://miniprogram-1320062640.cos.ap-nanjing.myqcloud.com/7.jpg', caption: '渐变滤镜压暗天空效果' },
          { url: 'https://miniprogram-1320062640.cos.ap-nanjing.myqcloud.com/8.jpg', caption: '径向滤镜突出主体效果' }
        ]
      },
      '6-3': {
        title: '色彩风格化',
        category: '后期处理',
        icon: '◓',
        duration: '18分钟',
        level: '进阶',
        content: `色彩风格化是建立个人风格的重要步骤。

【色相基础】
• 调整各颜色的偏向
• 分离色调高光阴影
• HSL精细控制

【色调分离】
• 高光加暖色
• 阴影加冷色
• 形成色调对比
• 增加氛围感

【HSL调整】
• 色相：改变颜色
• 饱和度：颜色浓淡
• 明亮度：颜色明暗

【常用风格】
• 暖色复古：整体偏暖
• 冷色清新：整体偏冷
• 油画感：饱和度高
• 高级灰：低饱和灰调

【建立风格】
1. 收集喜欢的作品
2. 分析共同色调
3. 记住参数设置
4. 应用于自己作品`,
        tips: ['每种风格都要尝试', '参考电影调色', '记录自己的预设'],
        images: [
          { url: 'https://miniprogram-1320062640.cos.ap-nanjing.myqcloud.com/9.jpg', caption: '暖色调复古风格效果' },
          { url: 'https://miniprogram-1320062640.cos.ap-nanjing.myqcloud.com/1.jpg', caption: '冷色调清新风格效果' }
        ]
      },
      '6-4': {
        title: '黑白转换',
        category: '后期处理',
        icon: '◓',
        duration: '12分钟',
        level: '入门',
        content: `黑白摄影是永恒的经典，让照片更有质感。

【转换方法】
• 饱和度降到-100
• 黑白转换图层
• HSL灰度模式
• Camera RAW

【高级技巧】
• 通道混合器
• 分离通道
• 增加对比度
• 强调纹理

【反差控制】
• 高反差：强烈有力
• 低反差：柔和细腻
• 中反差：沉稳内敛

【区域曝光】
• 亮调：亮部控制
• 中间调：过渡区域
• 暗调：暗部控制
• 调整各区域比例

【应用场景】
• 光影强烈时
• 色彩杂乱时
• 简化构图时
• 强调情绪时`,
        tips: ['反差决定黑白成败', '先转灰度再微调', '适合强调形状和纹理'],
        images: [
          { url: 'https://miniprogram-1320062640.cos.ap-nanjing.myqcloud.com/2.jpg', caption: '高反差黑白人像效果' },
          { url: 'https://miniprogram-1320062640.cos.ap-nanjing.myqcloud.com/3.jpg', caption: '低反差黑白风光效果' }
        ]
      }
    };

    const key = `${catId}-${topId}`;
    console.log('Looking for key:', key);
    console.log('Available keys:', Object.keys(allTopics));
    const topic = allTopics[key];
    console.log('Found topic:', topic ? topic.title : 'NOT FOUND');
    this.setData({ topic });
  },

  goBack() {
    wx.navigateBack();
  }
});