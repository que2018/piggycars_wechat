
var app = getApp();
var util = require('../../utils/util.js');

Page({
  data: {
    old_password: "",
    password: "",
    password_confirm: "",
    btn_loading: false
  },
  onLoad: function (options) {

  },
  password: function (e) {
    var that = this;

    that.setData({
      btn_loading: true
    });

    wx.request({
      url: app.globalData.API_PASSWORD,
      header: {
        'cookie': wx.getStorageSync("sessionid"),
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      data: util.json2Form({
        email: app.globalData.email,
        old_password: e.detail.value.old_password,
        password: e.detail.value.password,
        password_confirm: e.detail.value.password_confirm
      }),
      complete: function (res) {
        that.setData({
          btn_loading: false
        });

        //console.log(res.data);

        if(res.data.success) {
          wx.navigateBack({
            delta: 1
          });
        }
      }
    });
  }
})