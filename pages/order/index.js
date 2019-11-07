
var util = require('../../utils/util.js');
var app = getApp();

Page({
  data: {
    orders: []
  },
  onLoad: function (options) {
    this.loadData();
  },
  loadData: function () {
    var that = this;

    wx.request({
      url: app.globalData.API_ORDER + "?user_id=" + app.globalData.user_id,
      complete: function (res) {
        that.setData({
          show_loading: false,
          orders: res.data.data.orders
        });
        
        wx.hideNavigationBarLoading();
        wx.stopPullDownRefresh();
      }
    });
  },
  orderDetail: function (event) {
    var order_id = event.currentTarget.dataset.order_id

    wx.navigateTo({
      url: '../order_detail/index?order_id=' + order_id
    });
  },
  clickGoApply: function (event) {
    wx.switchTab({
      url: '../project/index'
    });
  },
  onPullDownRefresh: function () {
    this.loadData();
  }
})