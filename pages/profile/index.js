
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
  goToPwd: function (event) {
    wx.navigateTo({
      url: '../password/index'
    });
  },
  goToAddr: function (event) {
    wx.navigateTo({
      url: '../address/index'
    });
  },
  goToID: function (event) {
    wx.navigateTo({
      url: '../id/index'
    });
  }
})