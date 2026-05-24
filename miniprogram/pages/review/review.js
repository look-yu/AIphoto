// 摄影AI评阅页
Page({
  data: {
    hasImage: false,
    imageUrl: '',
    analyzing: false,
    analyzed: false,
    score: 0,
    gradeText: '',
    issues: [],
    analysisResult: {
      issues: [],
      suggestions: []
    }
  },

  onLoad() {
    // 初始化云开发
    if (!wx.cloud) {
      console.error('云开发未初始化');
    } else {
      wx.cloud.init({
        env: wx.cloud.DYNAMIC_CURRENT_ENV
      });
    }
  },

  goBack() {
    wx.navigateBack();
  },

  // 选择图片
  chooseImage() {
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        const tempFilePath = res.tempFilePaths[0];
        this.setData({
          hasImage: true,
          imageUrl: tempFilePath,
          analyzed: false,
          analyzing: false
        });
      },
      fail: () => {
        wx.showToast({ title: '请选择图片', icon: 'none' });
      }
    });
  },

  // 开始分析
  startAnalyze() {
    if (!this.data.hasImage) {
      wx.showToast({ title: '请先上传图片', icon: 'none' });
      return;
    }

    this.setData({ analyzing: true });

    // 设置超时（15秒）
    const timeout = setTimeout(() => {
      this.setData({ analyzing: false });
      wx.showToast({ title: '分析超时，请重试', icon: 'none' });
    }, 15000);

    // 1. 先上传图片到云存储
    wx.cloud.uploadFile({
      cloudPath: `review/${Date.now()}.jpg`,
      filePath: this.data.imageUrl,
      success: res => {
        console.log('图片上传成功', res.fileID);
        // 2. 调用云函数进行分析
        wx.cloud.callFunction({
          name: 'analyzeImage',
          data: {
            fileID: res.fileID
          },
          success: cloudRes => {
            console.log('云函数返回', cloudRes);
            clearTimeout(timeout);
            if (cloudRes.result && cloudRes.result.success) {
              this.processAnalysisResult(cloudRes.result.data);
            } else {
              wx.showToast({ title: cloudRes.result?.error || '分析失败', icon: 'none' });
              this.setData({ analyzing: false });
            }
          },
          fail: err => {
            console.error('云函数调用失败:', err);
            clearTimeout(timeout);
            this.setData({ analyzing: false });
            wx.showToast({ title: '网络错误，请重试', icon: 'none' });
          }
        });
      },
      fail: err => {
        console.error('图片上传失败:', err);
        clearTimeout(timeout);
        this.setData({ analyzing: false });
        wx.showToast({ title: '图片上传失败', icon: 'none' });
      }
    });
  },

  // 处理分析结果
  processAnalysisResult(result) {
    const score = result.totalScore;
    let gradeText = '';
    let issues = [];
    let suggestions = [];

    if (score >= 90) {
      gradeText = '优秀';
    } else if (score >= 80) {
      gradeText = '良好';
    } else if (score >= 70) {
      gradeText = '中等';
    } else if (score >= 60) {
      gradeText = '及格';
    } else {
      gradeText = '待改进';
    }

    // 根据各维度评分生成问题标注
    if (result.composition < 80) {
      issues.push({
        title: '构图偏置',
        description: '主体位置可以优化，建议使用三分法',
        suggestion: '将主体放置在画面三分线上',
        x: 30 + Math.random() * 20,
        y: 40 + Math.random() * 20
      });
    }

    if (result.light < 80) {
      issues.push({
        title: '光线不足',
        description: '画面光线较暗或对比度不足',
        suggestion: '利用黄金时段或补光设备',
        x: 50 + Math.random() * 20,
        y: 25 + Math.random() * 15
      });
    }

    if (result.color < 80) {
      issues.push({
        title: '色彩偏弱',
        description: '色调不够鲜明或白平衡偏差',
        suggestion: '调整白平衡或增强色彩饱和度',
        x: 60 + Math.random() * 15,
        y: 55 + Math.random() * 20
      });
    }

    // 处理建议
    if (result.suggestion) {
      suggestions = result.suggestion.split('。').filter(s => s.trim());
    }

    this.setData({
      analyzing: false,
      analyzed: true,
      score: score,
      gradeText: gradeText,
      issues: issues,
      analysisResult: {
        issues: issues,
        suggestions: suggestions
      }
    });
  },

  // 模拟分析结果（备用）
  simulateAnalysis() {
    const score = Math.floor(Math.random() * 30) + 65;
    let gradeText = '';
    let issues = [];
    let suggestions = [];

    if (score >= 90) {
      gradeText = '优秀';
    } else if (score >= 80) {
      gradeText = '良好';
    } else if (score >= 70) {
      gradeText = '中等';
    } else if (score >= 60) {
      gradeText = '及格';
    } else {
      gradeText = '待改进';
    }

    if (score < 85) {
      issues.push({
        title: '构图偏置',
        description: '主体位于画面左侧，建议使用三分法重新构图',
        suggestion: '将主体放置在右侧三分线上，或使用对称构图',
        x: 25 + Math.random() * 20,
        y: 40 + Math.random() * 20
      });
    }

    if (score < 80) {
      issues.push({
        title: '曝光稍过',
        description: '高光区域略有溢出，丢失细节',
        suggestion: '降低0.5档EV，或在后期处理中恢复高光',
        x: 50 + Math.random() * 20,
        y: 20 + Math.random() * 15
      });
    }

    if (score < 75) {
      issues.push({
        title: '背景稍乱',
        description: '背景元素过多干扰主体',
        suggestion: '使用大光圈虚化背景，或改变拍摄角度',
        x: 60 + Math.random() * 15,
        y: 55 + Math.random() * 20
      });
    }

    suggestions.push('尝试使用三分法构图，将主体放在交叉点上');
    suggestions.push('注意光线方向，顺光拍摄能获得更好的曝光');
    suggestions.push('选择简洁的背景可以突出主体');
    if (score < 80) {
      suggestions.push('黄金时段（日出日落）拍摄效果更佳');
    }

    this.setData({
      analyzing: false,
      analyzed: true,
      score: score,
      gradeText: gradeText,
      issues: issues,
      analysisResult: {
        issues: issues,
        suggestions: suggestions
      }
    });
  },

  // 显示问题详情
  showIssueDetail(e) {
    const index = e.currentTarget.dataset.index;
    const issue = this.data.issues[index];
    wx.showModal({
      title: issue.title,
      content: issue.description + '\n\n建议：' + issue.suggestion,
      showCancel: false
    });
  },

  // 重新评阅
  reAnalyze() {
    this.setData({
      analyzed: false,
      analyzing: false,
      hasImage: false,
      imageUrl: ''
    });
  },

  // 保存到作品集
  saveToGallery() {
    wx.showToast({ title: '已保存到作品集', icon: 'success' });
  },

  // 分享
  onShare() {
    wx.showShareMenu({
      withShareTicket: true
    });
  },

  // 查看历史
  goToHistory() {
    wx.showToast({ title: '历史记录开发中', icon: 'none' });
  }
});