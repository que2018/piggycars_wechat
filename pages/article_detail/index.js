
var WxParse = require('../../wxParse/wxParse.js');
var app = getApp();

Page({
  data: {
    cid:"",
    article_id:"",
    base_url: app.globalData.BASE_URL,
    show_loading: true
  },
  onLoad: function (options) {
    this.setData({
      cid: decodeURIComponent(options.cid),
      article_id: decodeURIComponent(options.article_id)
    });

    this.loadData();
  },
  loadData: function () {
    var that = this;
    wx.request({
      url: app.globalData.API_ARTICLE_DETIAL + this.data.cid + "/id/" + this.data.article_id,

      complete: function (res) {
        that.setData({
          show_loading: false,
          detail: res.data.data.detail
        });
        
        if (res.data.data.detail.content_mobile) {
          var content = res.data.data.detail.content_mobile;
        } else {
          var content = res.data.data.detail.content;
        }

        WxParse.wxParse('article', 'html', content, that, 20);
        wx.hideNavigationBarLoading()
        wx.stopPullDownRefresh()
      }
    });
  }
})