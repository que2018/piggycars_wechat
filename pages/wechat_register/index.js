
let app = getApp();
let util = require('../../utils/util.js');

Page({
  data: {
    first_name: "",
    last_name: "",
    email: "",
    btn_loading: false,
    success: false
  },
  onLoad: function (options) {
  },
  onReady: function () {
    this.alert = this.selectComponent("#alert");
  },
  register: function (e) {
    let that = this;

    that.setData({
      btn_loading: true
    });

    wx.login({
      success: function (res) {
        wx.getUserInfo({
          withCredentials: true,
          success: function (res_user) {
            wx.request({
              url: app.globalData.API_WECHAT_REGISTER,
              header: {
                "Content-Type": "application/x-www-form-urlencoded"
              },
              method: "POST",
              data: util.json2Form({
                api: "2",
                type: "wechat",
                param: res.code,
                iv: res_user.iv,
                encrypted_data: res_user.encryptedData,
                first_name: e.detail.value.first_name,
                last_name: e.detail.value.last_name,
                email: e.detail.value.email
              }),
              complete: function (res) {
                that.setData({
                  btn_loading: false
                });

                console.log(res.data);

                if (res.data.success) {
                  app.globalData.is_login = true;
                  app.globalData.openid = res.openid;
                  wx.setStorageSync("sessionid", res.header["Set-Cookie"]);

                  wx.switchTab({
                    url: '../wechat/index'
                  });
                } else {
                  var messages = [];

                  if (res.data.code == "error_form_error") {
                    for (var index in res.data.form_error) {
                      var message = res.data.form_error[index];

                      if (message) {
                        message = message.replace('<p>', '');
                        message = message.replace('</p>', '');
                        messages.push(message);
                      }
                    }
                  } else {
                    var message = res.data.msg;
                    message = message.replace('<p>', '');
                    message = message.replace('</p>', '');
                    message = message.replace('<em>', '');
                    message = message.replace('</em>', '');
                    messages.push(message);
                  }

                  that.alert.show(messages);
                }
              }
            });
          }
        });
      }
    });
  },
  bindLogin: function (event) {
    wx.navigateBack({
      delta: 1
    });
  },
})