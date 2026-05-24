// 首页 - Cinematic Darkroom
Page({
  data: {
    bannerImage: 'https://miniprogram-1320062640.cos.ap-nanjing.myqcloud.com/1.jpg',
    isWatched: false,
    showContactModal: false,
    worksList: [
      { id: 1, title: '城市光影', author: '光影师', score: 95, imageUrl: 'https://miniprogram-1320062640.cos.ap-nanjing.myqcloud.com/1.jpg' },
      { id: 2, title: '海岸线', author: '海风', score: 88, imageUrl: 'https://miniprogram-1320062640.cos.ap-nanjing.myqcloud.com/2.jpg' },
      { id: 3, title: '森林秘境', author: '绿野', score: 92, imageUrl: 'https://miniprogram-1320062640.cos.ap-nanjing.myqcloud.com/3.jpg' },
      { id: 4, title: '人像姿态', author: '肖像家', score: 90, imageUrl: 'https://miniprogram-1320062640.cos.ap-nanjing.myqcloud.com/4.jpg' },
      { id: 5, title: '建筑线条', author: '构架师', score: 86, imageUrl: 'https://miniprogram-1320062640.cos.ap-nanjing.myqcloud.com/5.jpg' },
      { id: 6, title: '静物之美', author: '发现者', score: 89, imageUrl: 'https://miniprogram-1320062640.cos.ap-nanjing.myqcloud.com/6.jpg' },
    ]
  },

  goToWorks() {
    wx.navigateTo({ url: '/pages/works/works' });
  },

  goToAcademy() {
    wx.navigateTo({ url: '/pages/academy/academy' });
  },

  goToAbout() {
    wx.navigateTo({ url: '/pages/about/about' });
  },

  goToReview() {
    wx.navigateTo({ url: '/pages/review/review' });
  },

  onWorkTap(e) {
    const id = e.currentTarget.dataset.id;
    wx.showToast({ title: '查看作品 ' + id, icon: 'none' });
  },

  onWatch() {
    const isWatched = !this.data.isWatched;
    this.setData({ isWatched });
    wx.showToast({
      title: isWatched ? '关注成功' : '取消关注',
      icon: 'success'
    });
  },

  onContact() {
    this.setData({ showContactModal: true });
  },

  onContactClose() {
    this.setData({ showContactModal: false });
  },

  onCall() {
    wx.makePhoneCall({
      phoneNumber: '18815750907',
      fail: () => {
        wx.showToast({ title: '拨打失败', icon: 'none' });
      }
    });
    this.setData({ showContactModal: false });
  },

  onCopyWechat() {
    wx.setClipboardData({
      data: 'wxid_g7tro0cr6onu22',
      success: () => {
        wx.showToast({ title: '微信号已复制', icon: 'success' });
      }
    });
    this.setData({ showContactModal: false });
  },

  stopPropagation() {}
});