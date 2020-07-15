
let app = getApp();

Page({
  data: {
    src: "",
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
    let that = this;

    this.ctx.takePhoto({
      quality: 'low',
      success: (res) => {
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
    let pages = getCurrentPages();
    let idPage = pages[pages.length - 2];

    if ((idPage.data.country == "cn") && (idPage.data.process == 0)) {
      console.log("cn0 photo");

      idPage.setData({
        process: 1,
        "cn_dl_photo_front": this.data.src
      });

    } else if ((idPage.data.country == "cn") && (idPage.data.process == 1)) {
      console.log("cn1 photo");

      idPage.setData({
        process: 2,
        "cn_id_photo_front": this.data.src
      });

    } else if ((idPage.data.country == "us") && (idPage.data.process == 0)) {
      console.log("us0 photo");

      idPage.setData({
        process: 1,
        "us_dl_photo_front": this.data.src
      });

    } else if ((idPage.data.country == "us") && (idPage.data.process == 1)) {
      console.log("us1 photo");

      idPage.setData({
        process: 2,
        "us_dl_photo_back": this.data.src
      });
    }

    wx.navigateBack({
      delta: 1
    });
  },
})