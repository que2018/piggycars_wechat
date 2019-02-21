
var util = require('../../utils/util.js');
var app = getApp();

Page({
  data: {
    hot_categories: "",
    comments: "",
    sliders: "",
    imgWidth: 0,
    imgHeight: 0,
    show_loading: true
  },
  onLoad: function (options) {
    this.setData({
      imgWidth: wx.getSystemInfoSync().windowWidth,
      imgHeight: wx.getSystemInfoSync().windowWidth * 600 / 1020
    });

    this.loadData();
  },
  onShow: function (options) {
    util.check_wechat_bg();
  },
  loadData: function () {
    var that = this;

    wx.request({
      url: app.globalData.API_HOME + "?category_id=0",
      complete: function (res) {
        that.setData({
          show_loading: false,
          sliders: res.data.sliders,
          hot_categories: res.data.hot_categories,
          comments: res.data.comments
        })

        wx.hideNavigationBarLoading()
        wx.stopPullDownRefresh()
      }
    })
  },
  clickCourse: function (event) {
    var hasChild = event.currentTarget.dataset.has_child
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
  clickSlider: function (event) {
    var category_id = event.currentTarget.dataset.category_id;

    if(category_id != 0) {
      var hasChild = event.currentTarget.dataset.has_child

      if (hasChild) {
        wx.navigateTo({
          url: '../category/index?category_id=' + category_id
        });
      } else {
        wx.navigateTo({
          url: '../course/index?category_id=' + category_id
        });
      }
    }
  },
  onPullDownRefresh: function () {
    util.check_wechat_bg();
    this.loadData();
  }
})
