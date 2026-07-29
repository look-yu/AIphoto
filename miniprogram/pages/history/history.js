// 评阅历史页
Page({
  data: {
    reviews: [],
    loading: true,
    expandedId: null
  },

  onLoad() {
    this.loadReviews();
  },

  loadReviews() {
    const db = wx.cloud.database();
    db.collection('reviews')
      .orderBy('createdAt', 'desc')
      .limit(50)
      .get()
      .then(res => {
        const reviews = res.data.map(item => ({
          ...item,
          displayDate: this.formatDate(item.createdAt),
          displayGrade: this.getGradeText(item.totalScore)
        }));
        this.setData({
          reviews: reviews,
          loading: false
        });
      })
      .catch(err => {
        console.error('加载历史记录失败:', err);
        this.setData({ loading: false });
        wx.showToast({ title: '加载失败', icon: 'none' });
      });
  },

  toggleDetail(e) {
    const id = e.currentTarget.dataset.id;
    this.setData({
      expandedId: this.data.expandedId === id ? null : id
    });
  },

  getGradeText(score) {
    if (score >= 90) return '优秀';
    if (score >= 80) return '良好';
    if (score >= 70) return '中等';
    if (score >= 60) return '及格';
    return '待改进';
  },

  formatDate(dateStr) {
    const d = new Date(dateStr);
    const month = d.getMonth() + 1;
    const day = d.getDate();
    const hour = d.getHours();
    const min = d.getMinutes().toString().padStart(2, '0');
    return `${month}月${day}日 ${hour}:${min}`;
  },

  goBack() {
    wx.navigateBack();
  }
});
