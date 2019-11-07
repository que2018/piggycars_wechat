
Page({
  data: {
    amount: 0
  },
  onLoad: function (options) {
    this.setData({
      amount: decodeURIComponent(options.amount) / 100
    })
  },
  clickReturn: function (event) {
    wx.switchTab({
      url: '../me/index'
    });
  }
})