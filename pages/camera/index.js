
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
        let pages = getCurrentPages();
        let idPage = pages[pages.length - 2];
        //console.log(idPage.route);

        let key = that.data.key;

        var process = 0;

        if (idPage.data.process == 0) {
          process = 1;
        } else {
          process = 2;
        }

        idPage.setData({
          process: process,
          "cn_dl_photo_front": res.tempImagePath,
          "cn_id_photo_front": res.tempImagePath
        });

        that.setData({
          show_preview: true,
          src: res.tempImagePath
        });
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