Page({
  data: {
    msg: ""
  },
  onLoad: function (options) {
    this.setData({
      msg: decodeURIComponent(options.msg)
    })
  },
  clickReturn: function (event) {
    wx.switchTab({
      url: '../me/index'
    });
  }
})