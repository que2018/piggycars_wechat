
let app = getApp();
let util = require('../../utils/util.js');

Page({
  data: {
    code: ""
  },
  onLoad: function (options) {
    this.setData({
      code: decodeURIComponent(options.code)
    });

    wx.request({
      url: app.globalData.API_WECHAT_REGISTER,
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      data: util.json2Form({
        api: "2",
        type: "wechat",
        param: code
      }),
      complete: function (res) {
        if (res.data.success) {
          app.globalData.is_login = true;

          that.setData({
            is_login: true,
            username: "",
            password: "",
          });

          if (res.data.data.phone) {
            let phone = res.data.data.phone;

            if (phone.charAt(0) == "1") {
              app.globalData.country_code = "1";
              app.globalData.phone_local = phone.substring(1, phone.length);

            } else {
              app.globalData.country_code = "86";
              app.globalData.phone_local = phone.substring(2, phone.length);
            }

            app.globalData.phone = phone;

            that.setData({
              phone: phone
            });
          }

          wx.setStorageSync("username", that.data.username);
          wx.setStorageSync("password", that.data.password);
          wx.setStorageSync("sessionid", res.header["Set-Cookie"]);

          that.getProfile();
          that.getId();

        } else {
          
        }
      }
    })
  }
})