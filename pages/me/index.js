
var app = getApp();
var util = require('../../utils/util.js');

Page({
  data: {
    email: "",
    password: "",
    is_login: false,
    show_loading: false
  },
  onLoad: function (options) {
    this.setData({ 
      is_login: app.globalData.is_login
    });
  },
  login: function (e) {
    var that = this;

    that.setData({
      loading: true
    });

    wx.request({
      url: app.globalData.API_LOGIN,
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      data: util.json2Form({
        username: e.detail.value.username,
        password: e.detail.value.password
      }),
      complete: function (res) {
        that.setData({
          loading: false
        });

        if(res.data.success) {
          that.setData({
            is_login: true
          });
        } else {

        }
      }
    });   
  }
})