
let app = getApp();
let util = require('../../utils/util.js');

Page({
  data: {
    top_categories: [],
    hot_categories: [],
    show_loading: true
  },
  onLoad: function (options) {
    this.loadData();
  },
  loadData: function () {
    let that = this;

    let header = {
      "Content-Type": "application/x-www-form-urlencoded"
    };

    let data = [];

    wx.request({
      url: app.globalData.API_COMMUNITY_HOME,
      header: header,
      method: "POST",
      data: util.json2Form(data),
      complete: function (res) {
        if (res.data.success) {
          console.log(res.data);

          var top_categories = [];

          if (res.data.top_categories) {
            for (var i = 0; i < res.data.top_categories.length; i++) {
              var top_category = new Object();

              let item = res.data.top_categories[i];

              top_category.id = decodeURIComponent(item.id);
              top_category.title = decodeURIComponent(item.title);

              top_categories.push(top_category);
            }
          }

          var hot_categories = [];

          if (res.data.hot_categories) {
            for (var i = 0; i < res.data.hot_categories.length; i++) {
              var hot_category = new Object();

              let item = res.data.hot_categories[i];

              hot_category.id = decodeURIComponent(item.id);
              hot_category.title = decodeURIComponent(item.title);
              hot_category.background_color = decodeURIComponent(item.background_color);

              hot_categories.push(hot_category);
            }
          }
  
          that.setData({
            show_loading: false,
            hot_categories: hot_categories,
            top_categories: top_categories
          });
        }
      }
    });
  }
})