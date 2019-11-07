var util = require('../../utils/util.js');
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    project_id: 0,
    amount:'',
    loading: false
  },

  onLoad: function (options) {
    this.setData({
      project_id: decodeURIComponent(options.project_id),
      amount: decodeURIComponent(options.amount)
    })
  },

  charge_card: function (e) {
    var that = this;

    that.setData({
      loading: true
    });

    wx.request({
      url: app.globalData.API_CHARGE_CARD,
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      data: util.json2Form({
        user_id: app.globalData.user_id,//??
        amount: that.data.amount,
        card_number: e.detail.value.card_number,
        month: e.detail.value.month,
        year: e.detail.value.year,
        cvv: e.detail.value.cvv
      }),
      complete: function (res) {
        that.setData({
          loading: false
        });

        if (res.data.status == 1) {
          wx.redirectTo({
            url: '../charge_success/index?amount=' + that.data.amount + '&project_id=' + that.data.project_id
          });
        } else {
          wx.navigateTo({
            url: '../charge_fail/index?msg=' + res.data.data.err_msg
          });
        }
      }
    });
  },
})