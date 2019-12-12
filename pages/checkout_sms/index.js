
var app = getApp();
var util = require('../../utils/util.js');

Page({
  data: {
    code: "",
    phone: app.globalData.phone,
    show_edit: false,
    country_code: "+1",
    country_codes: ["+1", "+86"],
    btn_sms_loading: false
  },
  onLoad: function (options) {

  },
  sms: function (e) {
    var that = this;

    that.setData({
      phone: e.detail.value.phone,
      btn_sms_loading: true
    });

    var phone = "";

    if (that.data.country_code == "+1") {
      phone = "1" + e.detail.value.phone;
    } else {
      phone = "86" + e.detail.value.phone;
    }

    wx.request({
      header: {
        'cookie': wx.getStorageSync("sessionid"),
        "Content-Type": "application/x-www-form-urlencoded"
      },
      url: app.globalData.API_SMS,
      method: "POST",
      data: util.json2Form({
        type: "sms",
        register: "1",
        phone: phone
      }),
      complete: function (res) {
        that.setData({
          btn_sms_loading: false
        });
      }
    });
  },
  bindCountryCodeChange: function (e) {
    let country_code = this.data.country_codes[e.detail.value];

    this.setData({
      country_code: country_code
    });
  },
  bindCode: function (e) {
    this.setData({
      code: e.detail.value
    })
  },
  bindStatic: function (e) {
    this.setData({
      show_edit: false
    });
  },
  bindEdit: function (e) {
    this.setData({
      show_edit: true
    });
  },
  bindNext: function (event) {
    var country_code = "";

    if (this.data.country_code == "+1") {
      country_code = "1";
    } else {
      country_code = "86";
    }

    wx.navigateTo({
      url: '../checkout_address/index?code=' + this.data.code + "&country_code=" + country_code + "&phone=" + this.data.phone
    });
  },
})