
var app = getApp();
var util = require('../../utils/util.js');

Page({
  data: {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    password_confirm: "",
    show_loading: false
  },
  onLoad: function (options) {
    
  },
  register: function (e) {
    var that = this;

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
          loading: false
        });

        console.log(res.data)

        if (res.data.success) {
          that.setData({
            is_login: true
          });
        } else {

        }
      }
    });
  }
})