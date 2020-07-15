
var app = getApp();
var util = require('../../utils/util.js');

Page({
  data: {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    password_confirm: "",
    btn_loading: false,
    success: false
  },
  onLoad: function (options) {
    
  },
  onReady: function () {
    this.alert = this.selectComponent("#alert");
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
          that.setData({
            success: true
          });
        } else {
          var messages = [];

          if (res.data.code == "error_form_error") {
            for (var index in res.data.form_error) {
              var message = res.data.form_error[index];

              if(message) {
                message = message.replace('<p>', '');
                message = message.replace('</p>', '');
                messages.push(message);
              }
            }
          }

          that.alert.show(messages);
        }
      }
    });
  },
  bindLogin: function (event) {
    wx.navigateBack({
      delta: 1
    });
  },
})