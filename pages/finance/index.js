
var util = require('../../utils/util.js');
var app = getApp();

Page({
  data: {
    transitions: ""
  },
  onLoad: function (options) {
    this.loadData();
  },
  loadData: function () {
    var that = this;

    wx.request({
      url: app.globalData.API_FINANCE + "?user_id=" + app.globalData.user_id,
      complete: function (res) {
        that.setData({
          show_loading: false,
          transitions: res.data.data.transitions
        })
        wx.hideNavigationBarLoading()
        wx.stopPullDownRefresh()
      }
    });
  },
  onPullDownRefresh: function () {
    this.loadData();
  }
})