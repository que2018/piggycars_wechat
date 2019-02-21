
var util = require('../../utils/util.js')
var app = getApp()

Page({
  data: {
    winWidth: 0,
    winHeight: 0,
    currentTab: 1,
    show_loading_description: true,
    show_loading_course: true,
    show_loading_comment: true,
    category_id: 0,
    name: '',
    description: '',
    courses: "",
    comments: "",
  },
  onLoad: function (options) {
    var that = this;

    this.setData({
      category_id: decodeURIComponent(options.category_id)
    });

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
    //util.check_wechat_bg();

    var that = this;
    wx.request({
      url: app.globalData.API_CLASSES + "?category_id=" + this.data.category_id,

      complete: function (res) {
        that.setData({
          show_loading_description: false,
          show_loading_course: false,
          show_loading_comment: false,
          name: res.data.name,
          description: res.data.description,
          courses: res.data.courses,
          comments: res.data.comments
        })
      }
    })
  },
  click: function (event) {
    var course_id = event.currentTarget.dataset.course_id

    wx.navigateTo({
      url: '../course_detail/index?course_id=' + course_id
    });
  },
  bindChange: function (e) {
    var that = this;
    that.setData({ currentTab: e.detail.current });
  },
  swichNav: function (e) {
    var that = this;

    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  }
})
