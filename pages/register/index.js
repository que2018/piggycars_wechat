
var app = getApp();
var util = require('../../utils/util.js');

Page({
  data: {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    password_confirm: "",
    btn_loading: false
  },
  onLoad: function (options) {
    
  },
  register: function (e) {
    var that = this;

    that.setData({
      btn_loading: true
    });

    wx.request({
      url: app.globalData.API_REGISTER,
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      data: util.json2Form({
        first_name: e.detail.value.first_name,
        last_name: e.detail.value.last_name,
        email: e.detail.value.email,
        password: e.detail.value.password,
        password_confirm: e.detail.value.password_confirm,
        agree: "1"
      }),
      complete: function (res) {
        that.setData({
          btn_loading: false
        });

        //console.log(res);

        if (res.data.success) {
          wx.navigateBack({
            delta: 1
          });
        } else {

        }
      }
    });
  }
})