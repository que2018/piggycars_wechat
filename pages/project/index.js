
var util = require('../../utils/util.js');
var app = getApp();

Page({
  data: {
    projects: "",
    base_url: app.globalData.BASE_URL,
    show_loading: true
  },
  onLoad: function (options) {
    this.loadData();
  },
  loadData: function () {
    var that = this;

    wx.request({
      url: app.globalData.API_PROJECT,
      complete: function (res) {
        if (!res.data.data){
          for (var i = 0; i < res.data.data.length; i++) {
            var new_time = util.formatTimeWithFormat(res.data.data[i].b_time, 'h:m');
            res.data.data[i].b_time = new_time;
          }
        }
        
        that.setData({
          show_loading: false,
          projects: res.data.data
        })
        wx.hideNavigationBarLoading()
        wx.stopPullDownRefresh()
      },
    });

    wx.request({
      url: app.globalData.API_CARS,
      complete: function (res) {
        console.log(res);
      },
    });

  },
  clickProject: function (event) {
    var project_id = event.currentTarget.dataset.project_id

    wx.navigateTo({
      url: '../project_detail/index?project_id=' + project_id
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
  onPullDownRefresh: function () {
    this.loadData();  
  }
})