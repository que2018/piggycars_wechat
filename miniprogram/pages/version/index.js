
var app = getApp();

Page({
  data: {
    version: "0.0.0"
  },
  onLoad: function (options) {
    this.setData({
      version: app.globalData.version
    });
  }
})