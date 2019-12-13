
var app = getApp();
var util = require('../../utils/util.js');

Page({
  data: {
    username: "",
    password: "",
    first_name: "",
    last_name: "",
    email: "",
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
      address_1: app.globalData.address.address_1,
      address_2: app.globalData.address.address_2,
      city: app.globalData.address.city,
      zone: app.globalData.address.zone,
      postcode: app.globalData.address.postcode,
      country: app.globalData.address.country,
      id_images: app.globalData.id_images
    });
  },
  onReady: function() {
    this.alert = this.selectComponent("#alert");
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

        console.log(res.data);

        if(res.data.success) {
          app.globalData.is_login = true;
          app.globalData.phone = res.data.data.phone;
          app.globalData.password = that.data.password;
          
          wx.setStorageSync("username", that.data.username);
          wx.setStorageSync("password", that.data.password);
          wx.setStorageSync("sessionid", res.header["Set-Cookie"]);

          that.setData({
            is_login: true,
            username: "",
            password: ""
          });

          that.get_profile();
          that.get_id();

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
            var message = res.data.msg;
            messages.push(message);
          }

          that.alert.show(messages);
        }
      }
    });   
  },
  get_profile: function (e) {
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

        if(res.data.success) {
          app.globalData.user_id = res.data.user_id;
          app.globalData.email = res.data.email;
          app.globalData.first_name = res.data.first_name;
          app.globalData.last_name = res.data.last_name;
          app.globalData.address = res.data.address;

          that.setData({
            first_name: res.data.first_name,
            last_name: res.data.last_name,
            email: res.data.email,
            address_1: res.data.address.address_1,
            address_2: res.data.address.address_2,
            city: res.data.address.city,
            zone: res.data.address.zone,
            postcode: res.data.address.postcode,
            country: res.data.address.country
          });
        } 
      }
    });
  },
  get_id: function (e) {
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

        var id_images =[];
      
        if(res.data.success) {
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
  },
  logout: function (e) {
    var that = this;

    that.setData({
      loading: true
    });

    wx.request({
      url: app.globalData.API_LOGOUT,
      complete: function (res) {
        that.setData({
          loading: false
        });

        if (res.data.success) {
          that.setData({
            is_login: false,
            user_id: "",
            username: "",
            password: "",
            email: "",
            phone: "",
            first_name: "",
            last_name: "",
            address: {},
            id_images: [],
            filter_params: "",
            checkout_id: 0,
            checkout_year: "",
            checkout_make: "",
            checkout_model: "",
            checkout_image: "",
            checkout_payment_down: 0,
            checkout_payment_down_tax: 0,
            checkout_payment_down_total: 0
          });

          wx.setStorageSync("username", "");
          wx.setStorageSync("password", "");
          wx.setStorageSync("sessionid", "");

        } else {

        }
      }
    });
  },
  clickRegister: function (event) {
    wx.navigateTo({
      url: '../register/index'
    });
  },
  goToPwd: function (event) {
    wx.navigateTo({
      url: '../password/index'
    });
  },
  goToAddr: function (event) {
    wx.navigateTo({
      url: '../sms/index'
    });
  },
  goToID: function (event) {
    wx.navigateTo({
      url: '../id/index'
    });
  }
})