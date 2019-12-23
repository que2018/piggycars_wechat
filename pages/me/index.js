
var app = getApp();
var util = require('../../utils/util.js');

Page({
  data: {
    username: "goodislook588@gmail.com",
    password: "Sam12345678@",
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
    show_loading: true
  },
  onLoad: function (options) {
    this.setData({ 
      show_loading: false,
      is_login: app.globalData.is_login,
      first_name: app.globalData.first_name,
      last_name: app.globalData.last_name,
      email: app.globalData.email,
      phone: (app.globalData.phone) ? app.globalData.phone : "",
      id_images: (app.globalData.id_images) ? app.globalData.id_images : "",
      address_1: (app.globalData.address.address_1)? app.globalData.address.address_1 : "",
      address_2: (app.globalData.address.address_2) ? app.globalData.address.address_2 : "",
      city: (app.globalData.address.city) ? app.globalData.address.city : "",
      zone: (app.globalData.address.zone) ? app.globalData.address.zone : "",
      postcode: (app.globalData.address.postcode) ? app.globalData.address.postcode : "",
      country: (app.globalData.address.country) ? app.globalData.address.country : ""
    });
  },
  onReady: function() {
    this.alert = this.selectComponent("#alert");
  },
  onShow: function () {
    this.setData({
      is_login: app.globalData.is_login
    });
  },
  login: function (e) {
    var that = this;

    that.setData({
      loading: true,
      username: e.detail.value.username,
      password: e.detail.value.password
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

        //console.log(res.data);

        if(res.data.success) {
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
          var messages = [];

          if(res.data.code == "error_form_error") {
            for (var index in res.data.form_error) {
              var message = res.data.form_error[index];
              message = message.replace('<p>', '');
              message = message.replace('</p>', '');
              messages.push(message);
            }
          }

          if (res.data.code == "validation_unsuccessful") {
            var message = "用户名或者密码错误";
            messages.push(message);

            that.setData({
              username: "",
              password: ""
            });
          }

          that.alert.show(messages);
        }
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
        //console.log(res.data);

        if (res.data.success) {
          that.setData({
            email: res.data.email,
            first_name: res.data.first_name
          });

          app.globalData.user_id = res.data.user_id;
          app.globalData.email = res.data.email;
          app.globalData.first_name = res.data.first_name;
          app.globalData.last_name = res.data.last_name;
          app.globalData.address = res.data.address;
        }
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
        }
      }
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