
var util = require('../../utils/util.js')
var app = getApp()

Page({
  data: {
    winWidth: 0,
    winHeight: 0,
    top_categories: "",
    loading_categories: true
  },
  onLoad: function (options) {
    var that = this;

    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }
    });
  },
  onShow: function (options) {
    util.check_wechat_bg();
    this.loadData();
  },
  loadData: function() {
    var that = this;

    wx.request({
      url: app.globalData.API_TOP_CATEGORIES,

      complete: function (res) {
        that.setData({
          loading_categories: false,
          top_categories: res.data.top_categories
        });

        wx.hideNavigationBarLoading()
        wx.stopPullDownRefresh()
      }
    });
  },
  clickCategory: function (event) {
    var hasChild = event.currentTarget.dataset.has_child;
    var category_id = event.currentTarget.dataset.category_id

    if (hasChild) {
      wx.navigateTo({
        url: '../category/index?category_id=' + category_id
      });
    } else {
      wx.navigateTo({
        url: '../course/index?category_id=' + category_id
      });
    } 
  },
  onPullDownRefresh: function () {
    this.loadData()
  }
})
