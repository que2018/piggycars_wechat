
Page({
  data: {
    amount: 0,
    fee: 0,
  },
  onLoad: function (options) {
    this.setData({
      amount: decodeURIComponent(options.amount),
      fee: decodeURIComponent(options.fee)
    })
  },
  clickReturn: function (event) {
    wx.switchTab({
      url: '../me/index'
    });
  }
})