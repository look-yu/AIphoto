const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database();

/**
 * 分析图片 - 模拟AI分析（无真实API）
 */
exports.main = async (event, context) => {
  const { fileID } = event;

  if (!fileID) {
    return {
      success: false,
      error: '缺少图片fileID'
    };
  }

  try {
    // 直接使用模拟数据（快速返回）
    const aiResult = {
      composition: Math.floor(Math.random() * 20) + 75,
      light: Math.floor(Math.random() * 20) + 70,
      color: Math.floor(Math.random() * 20) + 75,
      theme: Math.floor(Math.random() * 15) + 80
    };

    // 计算综合评分
    const totalScore = Math.round(
      (aiResult.composition * 0.3 +
       aiResult.light * 0.25 +
       aiResult.color * 0.25 +
       aiResult.theme * 0.2)
    );

    // 生成建议
    const suggestions = [];
    if (aiResult.composition < 80) suggestions.push('构图方面可以尝试使用三分法');
    if (aiResult.light < 80) suggestions.push('光线运用有待提升，建议利用黄金时段拍摄');
    if (aiResult.color < 80) suggestions.push('色彩方面可以适当调整白平衡');
    if (aiResult.theme < 80) suggestions.push('主题表达不够明确，尝试简化画面元素');
    if (suggestions.length === 0) suggestions.push('整体表现优秀！继续保持');

    return {
      success: true,
      data: {
        composition: aiResult.composition,
        light: aiResult.light,
        color: aiResult.color,
        theme: aiResult.theme,
        totalScore: totalScore,
        suggestion: suggestions.join('。') + '。'
      }
    };

  } catch (err) {
    console.error('图片分析失败:', err);
    return {
      success: false,
      error: err.message || '分析失败'
    };
  }
};