
var app = getApp()
var that = {};

Page({
  data: {
    category_id: 0,
    categories: "",
    show_loading: true
  },
  onLoad: function (options) {
    this.setData({ 
      category_id: decodeURIComponent(options.category_id) 
    })
  },
  onShow: function (options) {
    var that = this;
    wx.request({
      url: app.globalData.API_CATEGORIES + "?category_id=" + this.data.category_id,

      complete: function (res) {
        that.setData({
          show_loading: false,
          categories: res.data.categories
        })
      }
    })
  },
  click: function (event) {
    console.log(event)

    var hasChild = event.currentTarget.dataset.has_child;
    var category_id = event.currentTarget.dataset.category_id

    if (hasChild) {
      wx.redirectTo({
        url: '../category/index?category_id=' + category_id
      });
    } else {
      wx.navigateTo({
        url: '../course/index?category_id=' + category_id
      });
    } 
  }
})
