
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
      quality: 'low',
      success: (res) => {
        let pages = getCurrentPages();
        let idPage = pages[pages.length - 2];
        console.log(idPage.route);
        console.log(res.tempImagePath);

        let key = that.data.key;

        console.log("getting back ...");

        if ((idPage.data.country == "cn") && (idPage.data.process == 0)) {

          console.log("cn 0 ...");

          idPage.setData({
            process: 1,
            "cn_id_photo_front": res.tempImagePath
          });

        } else if ((idPage.data.country == "cn") && (idPage.data.process == 1)) {
          console.log("cn 1 ...");

          idPage.setData({
            process: 2,
            "cn_id_photo_back": res.tempImagePath
          });

        } else if ((idPage.data.country == "us") && (idPage.data.process == 0)) {
          console.log("us 0 ...");

          idPage.setData({
            process: 1,
            "us_dl_photo_front": res.tempImagePath
          });

        } else if ((idPage.data.country == "us") && (idPage.data.process == 1)) {
          console.log("us 1 ...");

          idPage.setData({
            process: 2,
            "us_dl_photo_back": res.tempImagePath
          });
        }

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