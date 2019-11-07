var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show_loading: false,
    show_error: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  withdrawalFormSubmit(e) {
    var that = this;
    var value = e.detail.value
    that.setData({
      show_loading: true,
      show_error: false
    })
    wx.request({
      url: app.globalData.API_WITHDRAWAL,
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      data: { user_id: app.globalData.user_id, bank_info: value.bank_info, take_money: value.take_money, trading_password: value.trading_password, phone_code: value.phone_code},
      complete: function (res) {
        if (res.data.status == 1) { //error
          that.setData({
            show_loading: false,
            show_error: true,
            error_msg: res.data.data.msg
          })
        } else {
          that.setData({
            show_error: false,
            show_loading: false
          })
          wx.redirectTo({
            url: '../withdrawal_ok/index?amount=' + res.data.data.amount + '&fee=' + res.data.data.fee
          });
        }
      },
    });
  },

  getSms(e) {
    var that = this;
    wx.request({
      url: app.globalData.API_WITHDRAWAL_GET_SMS,
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      data: { sid: 0, user_id: app.globalData.user_id },
      complete: function (res) {
        if (res.data.status == 1) { //error
          that.setData({
            show_loading: false,
            show_error: true,
            error_msg: res.data.data.msg
          })
        } else {
          that.setData({
            show_error: false,
            show_loading: false
          })
        }
      },
    });
  }
})