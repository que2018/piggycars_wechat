
var app = getApp();

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
    id_images: ""
  },
  onLoad: function (options) {
    this.setData({
      first_name: app.globalData.first_name,
      last_name: app.globalData.last_name,
      email: app.globalData.email,
      id_images: app.globalData.id_images,
      address_1: (app.globalData.address.address_1) ? app.globalData.address.address_1 : "",
      address_2: (app.globalData.address.address_2) ? app.globalData.address.address_2 : "",
      city: (app.globalData.address.city) ? app.globalData.address.city : "",
      zone: (app.globalData.address.zone) ? app.globalData.address.zone : "",
      postcode: (app.globalData.address.postcode) ? app.globalData.address.postcode : "",
      country: (app.globalData.address.country) ? app.globalData.address.country : ""
    });
  },
  onShow: function () {
    this.getProfile();
    this.getID();
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
  getID: function (e) {
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

          that.setData({
            id_images: id_images
          });

          app.globalData.id_images = id_images;
        }
      }
    });
  },
  bindPassword: function (event) {
    wx.navigateTo({
      url: '../password/index'
    });
  },
  bindSms: function (event) {
    wx.navigateTo({
      url: '../sms/index'
    });
  },
  bindID: function (event) {
    wx.navigateTo({
      url: '../id/index'
    });
  }
})