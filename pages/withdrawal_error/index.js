Page({

  data: {
    phone: '',
    name: '',
    black: ''
  },
  onLoad: function (options) {
    this.setData({
      phone: decodeURIComponent(options.phone),
      name: decodeURIComponent(options.name),
      black: decodeURIComponent(options.black),
    })
  },
  clickAuthenticPhone: function (event) {
    wx.navigateTo({
      url: '../authentic_phone/index'
    });
  },
  clickAuthenticName: function (event) {
    wx.navigateTo({
      url: '../authentic_name/index'
    });
  }
})