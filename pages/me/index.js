
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
    id_images: [],
    is_login: false,
    show_loading: false
  },
  onLoad: function (options) {
    this.setData({ 
      is_login: app.globalData.is_login
    });

    if(this.data.is_login) {
      this.get_profile();
    }
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
          app.globalData.is_login = true;
          wx.setStorageSync("sessionid", res.header["Set-Cookie"]);

          that.setData({
            is_login: true,
            username: "",
            password: ""
          });

          that.get_profile();
          that.get_id();

        } else {

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
        console.log(res.data);

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
        console.log(res.data);

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
            is_login: false
          });
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