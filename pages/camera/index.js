
var app = getApp();

Page({
  data: {
    show_preview: false
  },
  onLoad: function (options) {
    this.ctx = wx.createCameraContext()
  },
  takePhoto() {
    this.ctx.takePhoto({
      quality: 'high',
      success: (res) => {

        console.log(res.tempImagePath);

        this.setData({
          src: res.tempImagePath
        })
      }
    })
  },
})