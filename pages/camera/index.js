
var app = getApp();

Page({
  data: {
    show_preview: false
  },
  onLoad: function (options) {
    this.ctx = wx.createCameraContext()
  },
  takePhoto() {
    var that = this;

    this.ctx.takePhoto({
      quality: 'high',
      success: (res) => {
        console.log(res.tempImagePath);
        that.setData({
          show_preview: true,
          src: res.tempImagePath
        })
      }
    })
  },
  dismissPhoto() {
    this.setData({
      show_preview: false,
      src: ""
    });
  },
  confirmPhoto() {
    wx.navigateBack({
      delta: 1
    });
  },
})