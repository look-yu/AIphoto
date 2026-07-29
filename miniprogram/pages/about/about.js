// 关于页
Page({
  data: {
    version: 'v1.0.0'
  },

  goToIndex() {
    wx.redirectTo({ url: '/pages/index/index' });
  },

  goToWorks() {
    wx.redirectTo({ url: '/pages/works/works' });
  },

  goToAcademy() {
    wx.redirectTo({ url: '/pages/academy/academy' });
  },

  goToAgreement() {
    wx.navigateTo({ url: '/pages/agreement/agreement' });
  },

  goToPrivacy() {
    wx.navigateTo({ url: '/pages/privacy/privacy' });
  }
});
