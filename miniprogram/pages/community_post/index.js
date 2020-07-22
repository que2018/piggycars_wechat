
let app = getApp();

Page({
  data: {
    id: '',
    title: '',
    image: '../../images/placeholder.jpg',
    description: '',
    show_loading: true
  },
  onLoad: function (options) {
    this.loadData(options.id);

    that.setData({
      id: option.id
    });
  },
  loadData: function (post_id) {
    let that = this;

    wx.request({
      url: app.globalData.API_COMMUNITY_POST + "?id=" + post_id,
      complete: function (res) {
        console.log(res.data);

        that.setData({
          show_loading: false,
          title: res.data.title,
          description: res.data.description
        });
      }
    });
  },
  onShareAppMessage: function (res) {
    let path = "/pages/community_post/index?id=" + this.data.id;
 
    return {
      title: this.data.title,
      imageUrl: this.data.image,
      path: path, 
      success: function (res) {

      },
      fail: function (res) {

      }
    }
  }
});