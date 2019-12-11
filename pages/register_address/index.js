
var app = getApp();
var util = require('../../utils/util.js');

Page({
  data: {
    country_code: "",
    phone: "",
    code: "",
    address_1: "",
    address_2: "",
    city: "",
    zone: "",
    country: "",
    postcode: "",
    country: "",
    btn_addr_loading: false,
  },
  onLoad: function (options) {
    console.log("register address .... ");
    console.log(options);

    this.setData({
      country_code: decodeURIComponent(options.country_code),
      phone: decodeURIComponent(options.phone),
      code: decodeURIComponent(options.code)
    });
  },
  addr: function (e) {
    var that = this;

    that.setData({
      btn_addr_loading: true
    });

    console.log("register addresss session id");
    console.log(wx.getStorageSync("sessionid"));

    wx.request({
      header: {
        'cookie': wx.getStorageSync("sessionid"),
        "Content-Type": "application/x-www-form-urlencoded"
      },
      url: app.globalData.API_ADDR,
      method: "POST",
      data: util.json2Form({
        "country_code": that.data.country_code,
        "phone": that.data.phone,
        "code[sms]": that.data.code,
        "address_1": e.detail.value.address_1,
        "address_2": e.detail.value.address_2,
        "city": e.detail.value.city,
        "zone": e.detail.value.zone,
        "postcode": e.detail.value.postcode,
        "country": e.detail.value.country
      }),
      complete: function (res) {
        if (res.data.success) {
          wx.navigateBack({
            delta: 2
          });
        }
      }
    });
  }
})