
let app = getApp();
let util = require('../../utils/util.js');

Page({
  data: {
    username: "",
    password: "",
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    address_1: "",
    address_2: "",
    city: "",
    zone: "",
    postcode: "",
    country: "",
    id_images: "",
    is_login: false,
    loading_wechat: false,
    show_loading: true,
    wechat_loading: false
  },
  onLoad: function (options) {
  },
  onReady: function() {
    this.alert = this.selectComponent("#alert");
    this.wechat_button = this.selectComponent("#wechat-button");
  },
  onShow: function () {
    this.setData({
      show_loading: false,
      is_login: app.globalData.is_login,
    });

    this.getProfile();
    this.getId();
  },
  bindWechatLogin: function (e) {
    this.setData({
      wechat_loading: true
    });

    let that = this;

    wx.login({
      success: function (res) {
        wx.getUserInfo({
          withCredentials: true,
          success: function(res_user) {
            //console.log(res_user);

            wx.request({
              url: app.globalData.API_WECHAT_LOGIN,
              header: {
                "Content-Type": "application/x-www-form-urlencoded"
              },
              method: "POST",
              data: util.json2Form({
                api: "2",
                type: "wechat",
                param: res.code,
                iv: res_user.iv,
                encrypted_data: res_user.encryptedData
              }),
              complete: function (res_login) {
                that.setData({
                  wechat_loading: false
                });

                if (res_login.data.success) {
                  app.globalData.is_login = true;

                  that.setData({
                    is_login: true
                  });

                  if (res_login.data.data.phone) {
                    let phone = res_login.data.data.phone;

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

                  app.globalData.openid = res_login.openid;
                  wx.setStorageSync("sessionid", res_login.header["Set-Cookie"]);

                  that.getProfile();
                  that.getId();

                } else {
                  that.setData({
                    wechat_loading: false
                  });

                  wx.navigateTo({
                    url: '../wechat_register/index'
                  });
                }
              }
            });
          },
          fail: function (res) {
            that.setData({
              wechat_loading: false
            });

            that.alert.show(["您拒绝了微信登录授权"]);
          }
        });
      }
    });
  },
  getProfile: function (e) {
    var that = this;

    let header = {
      'content-type': 'application/x-www-form-urlencoded',
      'cookie': wx.getStorageSync("sessionid")
    };

    wx.request({
      header: header,
      url: app.globalData.API_USER,
      complete: function (res) {
        console.log(res.data);

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

        that.refreshProfile();
      }
    });
  },
  getId: function (e) {
    var that = this;

    let header = {
      'content-type': 'application/x-www-form-urlencoded',
      'cookie': wx.getStorageSync("sessionid")
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

          app.globalData.id_images = id_images;

          that.refreshProfile();
        }
      }
    });
  },
  refreshProfile: function () {
    this.setData({
      show_loading: false,
      is_login: app.globalData.is_login,
      first_name: app.globalData.first_name,
      last_name: app.globalData.last_name,
      email: app.globalData.email,
      phone: (app.globalData.phone) ? app.globalData.phone : "",
      id_images: (app.globalData.id_images) ? app.globalData.id_images : "",
      address_1: (app.globalData.address.address_1) ? app.globalData.address.address_1 : "",
      address_2: (app.globalData.address.address_2) ? app.globalData.address.address_2 : "",
      city: (app.globalData.address.city) ? app.globalData.address.city : "",
      zone: (app.globalData.address.zone) ? app.globalData.address.zone : "",
      postcode: (app.globalData.address.postcode) ? app.globalData.address.postcode : "",
      country: (app.globalData.address.country) ? app.globalData.address.country : ""
    });
  },
  bindRegister: function (event) {
    wx.navigateTo({
      url: '../register/index'
    });
  },
  bindOrder: function (event) {
    wx.navigateTo({
      url: '../order/index'
    });
  },
  bindProfile: function (event) {
    wx.navigateTo({
      url: '../profile/index'
    });
  },
  bindVersion: function (event) {
    wx.navigateTo({
      url: '../version/index'
    });
  },
  bindLogout: function (event) {
    wx.navigateTo({
      url: '../logout/index'
    });
  }
})