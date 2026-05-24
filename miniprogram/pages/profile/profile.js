// 个人中心
Page({
  data: {
    userInfo: {
      nickname: '摄影爱好者',
      avatar: '',
      level: '入门摄影师'
    },
    stats: {
      worksCount: 12,
      reviewsCount: 28,
      coursesCount: 5,
      avgScore: 86
    },
    settings: {
      assistantEnabled: true,
      notificationsEnabled: true
    }
  },

  onLoad() {
    this.loadUserData();
  },

  onShow() {
    // 获取存储的设置
    const settings = wx.getStorageSync('userSettings') || {};
    this.setData({
      settings: {
        assistantEnabled: settings.assistantEnabled !== false,
        notificationsEnabled: settings.notificationsEnabled !== false
      }
    });
  },

  loadUserData() {
    // 模拟用户数据
    // 实际项目中应该从云数据库获取
  },

  onMenuTap(e) {
    const type = e.currentTarget.dataset.type;
    switch(type) {
      case 'collections':
        wx.showToast({ title: '我的收藏', icon: 'none' });
        break;
      case 'history':
        wx.showToast({ title: '学习历史', icon: 'none' });
        break;
      case 'settings':
        wx.showToast({ title: '设置', icon: 'none' });
        break;
    }
  },

  onAssistantChange(e) {
    const enabled = e.detail.value;
    this.setData({
      'settings.assistantEnabled': enabled
    });
    // 保存设置
    wx.setStorageSync('userSettings', this.data.settings);
    wx.showToast({
      title: enabled ? '悬浮助手已开启' : '悬浮助手已关闭',
      icon: 'none'
    });
  },

  onNotificationChange(e) {
    const enabled = e.detail.value;
    this.setData({
      'settings.notificationsEnabled': enabled
    });
    // 保存设置
    wx.setStorageSync('userSettings', this.data.settings);
    wx.showToast({
      title: enabled ? '消息通知已开启' : '消息通知已关闭',
      icon: 'none'
    });
  },

  goToIndex() {
    wx.redirectTo({ url: '/pages/index/index' });
  },

  goToAcademy() {
    wx.redirectTo({ url: '/pages/academy/academy' });
  },

  goToReview() {
    wx.redirectTo({ url: '/pages/review/review' });
  },

  toggleAssistant() {
    wx.showToast({ title: '点击悬浮助手', icon: 'none' });
  }
});