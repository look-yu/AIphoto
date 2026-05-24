// 关于页
Page({
  goToIndex() {
    wx.redirectTo({ url: '/pages/index/index' });
  },

  goToWorks() {
    wx.redirectTo({ url: '/pages/works/works' });
  },

  goToAcademy() {
    wx.redirectTo({ url: '/pages/academy/academy' });
  }
});