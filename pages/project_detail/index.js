
var app = getApp();
var WxParse = require('../../wxParse/wxParse.js');

Page({
  data: {
    project_id: "",
    base_url: app.globalData.BASE_URL,
    detail: "",
    show_loading: true,
    imgalist: ""
  },
  onLoad: function (options) {
    this.setData({
      project_id: decodeURIComponent(options.project_id)
    });

    this.loadData();
  },
  loadData: function () {
    var that = this;

    wx.request({
      url: app.globalData.API_PROJECT_DETIAL + this.data.project_id,
      complete: function (res) {
        var order_list = res.data.data.order_list;
        for (var i = 0; i < order_list.length; i++) {
          var old_name = order_list[i].user_name;
          var new_name = old_name.replace(old_name.substring(1, 5), "****");;
          res.data.data.order_list[i].user_name = new_name;
        }

        that.setData({
          show_loading: false,
          detail: res.data.data,
          imgalist: res.data.data.sliders
        });

        WxParse.wxParse('description', 'html', res.data.data.description, that, 10);
        
        wx.hideNavigationBarLoading();
        wx.stopPullDownRefresh();
      }
    });
  },
  clickApply: function (event) {
    if (app.globalData.is_login) {
      var project_id = event.currentTarget.dataset.project_id

      wx.navigateTo({
        url: '../apply/index?project_id=' + project_id
      });
    } else {
      wx.switchTab({
        url: '../me/index'
      });
    }
  },
  previewImage: function (e) {
    var current = e.target.dataset.src;
    wx.previewImage({
      current: current,
      urls: this.data.imgalist
    })
  },
  onPullDownRefresh: function () {
    this.loadData();
  }
})