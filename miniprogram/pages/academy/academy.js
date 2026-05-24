// 摄影学院页
Page({
  data: {
    categories: [
      {
        id: 1,
        title: '基础入门',
        icon: '◐',
        description: '摄影最核心的基础概念',
        expanded: false,
        topics: [
          { id: 1, title: '相机基本操作', summary: '了解相机各部件功能' },
          { id: 2, title: '曝光三要素', summary: '光圈、快门、ISO的关系' },
          { id: 3, title: '对焦与景深', summary: '如何获得清晰锐利的画面' },
          { id: 4, title: '白平衡与色彩', summary: '理解色温与白平衡设置' }
        ]
      },
      {
        id: 2,
        title: '构图法则',
        icon: '◇',
        description: '让照片更有美感的方法',
        expanded: false,
        topics: [
          { id: 1, title: '三分法', summary: '最经典易用的构图法则' },
          { id: 2, title: '黄金分割', summary: '自然界最美的比例' },
          { id: 3, title: '对角线构图', summary: '引导视线，增强动感' },
          { id: 4, title: '框架构图', summary: '利用前景形成自然框架' }
        ]
      },
      {
        id: 3,
        title: '光线运用',
        icon: '☀',
        description: '摄影是用光的艺术',
        expanded: false,
        topics: [
          { id: 1, title: '自然光', summary: '阳光与天空光的运用' },
          { id: 2, title: '人造光', summary: '室内布光技巧' },
          { id: 3, title: '逆光摄影', summary: '轮廓光与剪影效果' },
          { id: 4, title: '黄金时段', summary: '日出日落时分的魅力' }
        ]
      },
      {
        id: 4,
        title: '人像摄影',
        icon: '◑',
        description: '捕捉人物的神韵与情感',
        expanded: false,
        topics: [
          { id: 1, title: '焦段选择', summary: '不同焦段的人像效果' },
          { id: 2, title: '摆姿指导', summary: '让模特更自然的方法' },
          { id: 3, title: '眼神光', summary: '让照片更有神' },
          { id: 4, title: '环境人像', summary: '人与环境的融合' }
        ]
      },
      {
        id: 5,
        title: '风光摄影',
        icon: '◒',
        description: '记录大自然的壮美',
        expanded: false,
        topics: [
          { id: 1, title: '黄金时段', summary: '利用日出日落的光线' },
          { id: 2, title: '滤镜使用', summary: 'ND镜与偏振镜' },
          { id: 3, title: '景深控制', summary: '前后景都清晰的方法' },
          { id: 4, title: '全景接片', summary: '广阔风光的拍摄技巧' }
        ]
      },
      {
        id: 6,
        title: '后期处理',
        icon: '◓',
        description: '让照片更完美的魔法',
        expanded: false,
        topics: [
          { id: 1, title: '基础调色', summary: '曝光、对比度、饱和度' },
          { id: 2, title: '局部调整', summary: '画龙点睛的技巧' },
          { id: 3, title: '色彩风格化', summary: '打造个人风格' },
          { id: 4, title: '黑白转换', summary: '让照片更有质感' }
        ]
      }
    ]
  },

  onLoad() {},

  toggleCategory(e) {
    const id = e.currentTarget.dataset.id;
    const categories = this.data.categories.map(item => {
      if (item.id === id) {
        return { ...item, expanded: !item.expanded };
      }
      return item;
    });
    this.setData({ categories });
  },

  onTopicTap(e) {
    const { categoryId, topicId, title } = e.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/topic/topic?categoryId=${categoryId}&topicId=${topicId}`
    });
  },

  goToIndex() {
    wx.redirectTo({ url: '/pages/index/index' });
  },

  goToWorks() {
    wx.redirectTo({ url: '/pages/works/works' });
  },

  goToAbout() {
    wx.redirectTo({ url: '/pages/about/about' });
  }
});