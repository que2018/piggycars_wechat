
var util = require('../../utils/util.js');
var app = getApp();

Page({
  data: {
    loading: false
  },
  onLoad: function (options) {

  },
  clickLogout: function (event) {
    var that = this;

    that.setData({
      loading: true
    });

    wx.login({
      success: function (res) {
        wx.request({
          url: app.globalData.API_LOGOUT + "?code=" + res.code,
          complete: function (res) {
            that.setData({
              loading: false
            });  

            if (res.data.status == 1) {
              app.globalData.is_login = false;
              app.globalData.user_id = 0;
              app.globalData.user_name = "";
              app.globalData.money = 0;

              wx.switchTab({
                url: '../me/index'
              });

            } else {
              wx.showToast({
                title: res.data.info,
                image: '/images/cry.png',
                duration: 2000,
                mask: true
              });
            }
          }
        })
      }
    });  
  }
})