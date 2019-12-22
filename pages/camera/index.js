
var app = getApp();

Page({
  data: {
    id_key: "",
    show_preview: false
  },
  onLoad: function (options) {
    this.ctx = wx.createCameraContext();

    this.setData({
      id_key: decodeURIComponent(options.id_key)
    });
  },
  takePhoto() {
    var that = this;

    this.ctx.takePhoto({
      quality: 'high',
      success: (res) => {
        console.log(res.tempImagePath);

        let pages = that.getCurrentPages();
        let prevPage = pages[pages.length - 2];
        console.log(prevPage.route);

        let key = that.data.key;

        prevPage.setData({
          key: res.tempImagePath
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