
var app = getApp();

Page({
  onLoad: function (options) {
    wx.request({
      url: app.globalData.API_LANG,
      complete: function (res) {
        wx.switchTab({
          url: '../home/index'
        });
      }
    });
  }
})
