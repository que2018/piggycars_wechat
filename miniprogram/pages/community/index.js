
let app = getApp();
let util = require('../../utils/util.js');

Page({
  data: {

  },
  onLoad: function (options) {
    this.loadData();
  },
  loadData: function () {
    let that = this;

    let header = {
      "Content-Type": "application/x-www-form-urlencoded"
    };

    let data = [];

    wx.request({
      url: app.globalData.API_POST_CATEGORIES,
      header: header,
      method: "POST",
      data: util.json2Form(data),
      complete: function (res) {
        if (res.data.success) {
          onsole.log(res.data);

          

        }
      }
    });
  }
})