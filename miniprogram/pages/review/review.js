// 摄影AI评阅页
Page({
  data: {
    hasImage: false,
    imageUrl: '',
    imageFileID: '',
    analyzing: false,
    analyzed: false,
    score: 0,
    gradeText: '',
    issues: [],
    reviewData: null,
    analysisResult: {
      issues: [],
      suggestions: []
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
          imageFileID: '',
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

    const timeout = setTimeout(() => {
      this.setData({ analyzing: false });
      wx.showToast({ title: '分析超时，请重试', icon: 'none' });
    }, 15000);

    wx.cloud.uploadFile({
      cloudPath: `review/${Date.now()}.jpg`,
      filePath: this.data.imageUrl,
      success: res => {
        this.setData({ imageFileID: res.fileID });
        wx.cloud.callFunction({
          name: 'analyzeImage',
          data: { fileID: res.fileID },
          success: cloudRes => {
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

    // 基于规则的固定标记位置（不再使用随机坐标）
    if (result.composition < 80) {
      issues.push({
        title: '构图偏置',
        description: '主体位置可以优化，建议使用三分法',
        suggestion: '将主体放置在画面三分线上',
        x: 35, y: 50
      });
    }

    if (result.light < 80) {
      issues.push({
        title: '光线不足',
        description: '画面光线较暗或对比度不足',
        suggestion: '利用黄金时段或补光设备改善',
        x: 60, y: 25
      });
    }

    if (result.color < 80) {
      issues.push({
        title: '色彩偏弱',
        description: '色调不够鲜明或白平衡偏差',
        suggestion: '调整白平衡或增强色彩饱和度',
        x: 55, y: 65
      });
    }

    if (result.theme < 80) {
      issues.push({
        title: '主题表达',
        description: '画面主题不够突出或不够明确',
        suggestion: '简化画面元素，尝试单一主体构图',
        x: 50, y: 45
      });
    }

    if (result.suggestion) {
      suggestions = result.suggestion.split('。').filter(s => s.trim());
    }

    this.setData({
      analyzing: false,
      analyzed: true,
      score: score,
      gradeText: gradeText,
      issues: issues,
      reviewData: result,
      analysisResult: {
        issues: issues,
        suggestions: suggestions
      }
    });
  },

  // 主操作按钮 — 根据当前状态决定行为
  onPrimaryAction() {
    if (this.data.analyzing) return;
    if (this.data.analyzed) {
      this.reAnalyze();
    } else if (this.data.hasImage) {
      this.startAnalyze();
    }
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
      imageUrl: '',
      imageFileID: '',
      reviewData: null
    });
  },

  // 保存到作品集（云函数已自动存入reviews集合）
  saveToGallery() {
    if (!this.data.analyzed) {
      wx.showToast({ title: '请先完成评阅', icon: 'none' });
      return;
    }
    wx.showToast({ title: '已保存到作品集', icon: 'success' });
  },

  // 分享
  onShare() {
    wx.showShareMenu({ withShareTicket: true });
  },

  // 查看历史
  goToHistory() {
    wx.navigateTo({ url: '/pages/history/history' });
  }
});
