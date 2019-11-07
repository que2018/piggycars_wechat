
var app = getApp();

Page({
  data: {
    list: "",
    cid: 0,
    show_loading: true,
    base_url: app.globalData.BASE_URL
  },
  onLoad: function (options) {
    this.setData({
      cid: decodeURIComponent(options.cid)
    });

    this.loadData();
  },
  loadData: function () {
    var that = this;

    wx.request({
      url: app.globalData.API_ARTICLE + this.data.cid,

      complete: function (res) {
        that.setData({
          show_loading: false,
          list: res.data.data.list
        });

        wx.hideNavigationBarLoading();
        wx.stopPullDownRefresh();
      }
    });
  },
  clickArticle: function(event) {
    var article_id = event.currentTarget.dataset.article_id

    wx.navigateTo({
      url: '../article_detail/index?cid=' + this.data.cid + '&article_id=' + article_id
    });
  },
  onPullDownRefresh: function () {
    this.loadData();
  }
})