
var app = getApp();

Page({
  data: {
    version: "ddd"
  },
  onLoad: function (options) {
    this.setData({
      version: app.globalData.version
    });
  }
})