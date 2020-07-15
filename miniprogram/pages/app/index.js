
let app = getApp();
let util = require('../../utils/util.js');

Page({
  onLoad: function (options) {
    var that = this;

    wx.login({
      success: function (res) {
        wx.request({
          url: app.globalData.API_WECHAT_LOGIN,
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          method: "POST",
          data: util.json2Form({
            api: "2",
            type: "wechat",
            param: res.code
          }),
          complete: function (res_login) {
            console.log(res_login);

            if (res_login.data.success) {
              app.globalData.is_login = true;
              wx.setStorageSync("sessionid", res_login.header["Set-Cookie"]);

              that.get_profile();
              that.get_id();
            }

            wx.switchTab({
              url: '../home/index'
            });
          }
        });
      }
    });
  },
  get_profile: function (e) {
    let that = this;

    let header = {
      'cookie': wx.getStorageSync("sessionid"),
      'content-type': 'application/x-www-form-urlencoded'
    };

    wx.request({
      header: header,
      url: app.globalData.API_USER,
      complete: function (res) {
        if (res.data.success) {
          app.globalData.user_id = res.data.user_id;
          app.globalData.email = res.data.email;
          app.globalData.first_name = res.data.first_name;
          app.globalData.last_name = res.data.last_name;
          app.globalData.address = res.data.address;

          if (res.data.phone) {
            let phone = res.data.phone;

            if (phone.charAt(0) == "1") {
              app.globalData.country_code = "1";
              app.globalData.phone_local = phone.substring(1, phone.length);
            } else {
              app.globalData.country_code = "86";
              app.globalData.phone_local = phone.substring(2, phone.length);
            }

            app.globalData.phone = phone;
          }
        }
      }
    });
  },
  get_id: function (e) {
    var that = this;

    let header = {
      'cookie': wx.getStorageSync("sessionid"),
      'content-type': 'application/x-www-form-urlencoded'
    };

    wx.request({
      header: header,
      url: app.globalData.API_ID,
      complete: function (res) {
        //console.log(res.data);

        var id_images = [];

        if (res.data.success) {
          if (res.data.data.dl_image) {
            id_images.push(res.data.data.dl_image);
          }

          if (res.data.data.dl_image_back) {
            id_images.push(res.data.data.dl_image_back);
          }

          if (res.data.data.id_image) {
            id_images.push(res.data.data.id_image);
          }

          that.setData({
            id_images: id_images
          });

          app.globalData.id_images = id_images;
        }
      }
    });
  }
})
