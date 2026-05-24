// 开屏页 - 纯白启动页，自动跳转
Page({
  data: {},

  onLoad() {
    // 2秒后自动跳转到主页
    setTimeout(() => {
      wx.redirectTo({
        url: '/pages/index/index',
      });
    }, 2000);
  },
});