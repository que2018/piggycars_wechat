
var app = getApp();

Page({
  data: {
   order: {}
  },
  onLoad: function (options) {
    this.setData({
      order: app.globalData.order
    });
  }
})