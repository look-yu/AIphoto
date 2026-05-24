// 作品页 - Cinematic Darkroom
Page({
  data: {
    worksList: [
      { id: 1, title: '城市光影', author: '光影师', imageUrl: 'https://miniprogram-1320062640.cos.ap-nanjing.myqcloud.com/1.jpg' },
      { id: 2, title: '海岸线', author: '海风', imageUrl: 'https://miniprogram-1320062640.cos.ap-nanjing.myqcloud.com/2.jpg' },
      { id: 3, title: '森林秘境', author: '绿野', imageUrl: 'https://miniprogram-1320062640.cos.ap-nanjing.myqcloud.com/3.jpg' },
      { id: 4, title: '人像姿态', author: '肖像家', imageUrl: 'https://miniprogram-1320062640.cos.ap-nanjing.myqcloud.com/4.jpg' },
      { id: 5, title: '建筑线条', author: '构架师', imageUrl: 'https://miniprogram-1320062640.cos.ap-nanjing.myqcloud.com/5.jpg' },
      { id: 6, title: '静物之美', author: '发现者', imageUrl: 'https://miniprogram-1320062640.cos.ap-nanjing.myqcloud.com/6.jpg' },
      { id: 7, title: '街头时光', author: '记录者', imageUrl: 'https://miniprogram-1320062640.cos.ap-nanjing.myqcloud.com/7.jpg' },
      { id: 8, title: '自然之韵', author: '旅行者', imageUrl: 'https://miniprogram-1320062640.cos.ap-nanjing.myqcloud.com/8.jpg' },
      { id: 9, title: '旅行记忆', author: '漫游者', imageUrl: 'https://miniprogram-1320062640.cos.ap-nanjing.myqcloud.com/9.jpg' },
      { id: 10, title: '日落余晖', author: '光影师', imageUrl: 'https://miniprogram-1320062640.cos.ap-nanjing.myqcloud.com/works_sunset1.jpg' },
      { id: 11, title: '暮色霞光', author: '光影师', imageUrl: 'https://miniprogram-1320062640.cos.ap-nanjing.myqcloud.com/works_sunset2.jpg' },
      { id: 12, title: '晚霞漫天', author: '光影师', imageUrl: 'https://miniprogram-1320062640.cos.ap-nanjing.myqcloud.com/works_sunset3.jpg' },
      { id: 13, title: '落日熔金', author: '光影师', imageUrl: 'https://miniprogram-1320062640.cos.ap-nanjing.myqcloud.com/works_sunset4.jpg' },
      { id: 14, title: '夕阳西下', author: '光影师', imageUrl: 'https://miniprogram-1320062640.cos.ap-nanjing.myqcloud.com/works_sunset5.jpg' },
      { id: 15, title: '黄昏时分', author: '光影师', imageUrl: 'https://miniprogram-1320062640.cos.ap-nanjing.myqcloud.com/works_sunset6.jpg' },
      { id: 16, title: '暮霭沉沉', author: '光影师', imageUrl: 'https://miniprogram-1320062640.cos.ap-nanjing.myqcloud.com/works_sunset7.jpg' },
      { id: 17, title: '余晖倒影', author: '光影师', imageUrl: 'https://miniprogram-1320062640.cos.ap-nanjing.myqcloud.com/works_sunset8.jpg' },
      { id: 18, title: '晚霞如画', author: '光影师', imageUrl: 'https://miniprogram-1320062640.cos.ap-nanjing.myqcloud.com/works_sunset9.jpg' },
      { id: 19, title: '日落大道', author: '光影师', imageUrl: 'https://miniprogram-1320062640.cos.ap-nanjing.myqcloud.com/works_sunset10.jpg' },
      { id: 20, title: '夕阳剪影', author: '光影师', imageUrl: 'https://miniprogram-1320062640.cos.ap-nanjing.myqcloud.com/works_sunset11.jpg' },
      { id: 21, title: '暮光之城', author: '光影师', imageUrl: 'https://miniprogram-1320062640.cos.ap-nanjing.myqcloud.com/works_sunset12.jpg' },
      { id: 22, title: '落日余晖', author: '光影师', imageUrl: 'https://miniprogram-1320062640.cos.ap-nanjing.myqcloud.com/works_sunset13.jpg' },
      { id: 23, title: '晚霞灿烂', author: '光影师', imageUrl: 'https://miniprogram-1320062640.cos.ap-nanjing.myqcloud.com/works_sunset14.jpg' },
      { id: 24, title: '夕阳红满天', author: '光影师', imageUrl: 'https://miniprogram-1320062640.cos.ap-nanjing.myqcloud.com/works_sunset15.jpg' },
      { id: 25, title: '暮色渐浓', author: '光影师', imageUrl: 'https://miniprogram-1320062640.cos.ap-nanjing.myqcloud.com/works_sunset16.jpg' },
      { id: 26, title: '落日霞光', author: '光影师', imageUrl: 'https://miniprogram-1320062640.cos.ap-nanjing.myqcloud.com/works_sunset17.jpg' },
      { id: 27, title: '黄昏暮霭', author: '光影师', imageUrl: 'https://miniprogram-1320062640.cos.ap-nanjing.myqcloud.com/works_sunset18.jpg' },
      { id: 28, title: '晚霞绚烂', author: '光影师', imageUrl: 'https://miniprogram-1320062640.cos.ap-nanjing.myqcloud.com/works_sunset19.jpg' },
      { id: 29, title: '夕阳无限', author: '光影师', imageUrl: 'https://miniprogram-1320062640.cos.ap-nanjing.myqcloud.com/works_sunset20.jpg' },
      { id: 30, title: '暮光海岸', author: '光影师', imageUrl: 'https://miniprogram-1320062640.cos.ap-nanjing.myqcloud.com/works_sunset21.jpg' },
    ]
  },

  onWorkTap(e) {
    const id = e.currentTarget.dataset.id;
    wx.showToast({ title: '查看作品 ' + id, icon: 'none' });
  },

  goToIndex() {
    wx.redirectTo({ url: '/pages/index/index' });
  },

  goToAcademy() {
    wx.redirectTo({ url: '/pages/academy/academy' });
  },

  goToAbout() {
    wx.redirectTo({ url: '/pages/about/about' });
  }
});