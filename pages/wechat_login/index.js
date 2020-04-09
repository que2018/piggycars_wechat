
let app = getApp();
let util = require('../../utils/util.js');

Page({
  data: {

  },
  onLoad: function (options) {
    wx.login({
      success: function (res) {
        wx.request({
          url: app.globalData.API_WECHAT_LOGIN,
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          method: "POST",
          data: util.json2Form({
            type: "wechat",
            param: res.code
          }),
          complete: function (res) {
            console.log(res.data);
          }
        })
      }
    })
  }
})