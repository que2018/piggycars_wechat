
var app = getApp();

Page({
  data: {
    order_id: 0
  },
  onLoad: function (options) {
    this.setData({
      order_id: decodeURIComponent(options.order_id)
    });
  },
  bindOrderDetail: function (event) {
    wx.navigateTo({
      url: '../order/index'
    });
  }
})