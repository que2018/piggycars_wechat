
var app = getApp();

Page({
  data: {
  
  },
  onLoad: function (options) {
    var that = this;

    wx.request({
      url: app.globalData.API_LANG,
      
      method: "POST",
      complete: function (res) {
        console.log(res);
      }
    });
  }
})
