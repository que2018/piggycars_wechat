
var app = getApp();
var util = require('../../utils/util.js');

Page({
  data: {
    btn_logout_loading: false
  },
  onLoad: function (options) {

  },
  bindLogout: function (e) {
    var that = this;

    that.setData({
      btn_logout_loading: true
    });

    wx.request({
      url: app.globalData.API_LOGOUT,
      complete: function (res) {
        that.setData({
          btn_logout_loading: false
        });

        if (res.data.success) {
          app.globalData.is_login = false;
          app.globalData.user_id = "";
          app.globalData.username = "";
          app.globalData.password = "";
          app.globalData.email = "";
          app.globalData.country_code = "";
          app.globalData.phone_local = "";
          app.globalData.phone = "";
          app.globalData.first_name = "";
          app.globalData.last_name = "";
          app.globalData.address = {};
          app.globalData.id_images = [];
          app.globalData.filter_params = "";
          app.globalData.checkout_id = 0;
          app.globalData.checkout_year = "";
          app.globalData.checkout_make = "";
          app.globalData.checkout_mode = "";
          app.globalData.checkout_image = "";
          app.globalData.checkout_payment_down = 0;
          app.globalData.checkout_payment_down_tax = 0;
          app.globalData.checkout_payment_down_total = 0;

          wx.setStorageSync("username", "");
          wx.setStorageSync("password", "");
          wx.setStorageSync("sessionid", "");

          wx.switchTab({
            url: '../home/index'
          });
        } else {

        }
      }
    });
  }
})