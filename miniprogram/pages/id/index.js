
let app = getApp();
let util = require('../../utils/util.js');

Page({
  data: {
    process: 0,
    country: "",
    description: "",
    sample_image: "",
    cn_dl_photo_front: "",
    cn_id_photo_front: "",
    us_dl_photo_front: "",
    us_dl_photo_back: "",
    cn_dl_photo_front_success: false,
    cn_id_photo_front_success: false,
    us_dl_photo_front_success: false,
    us_dl_photo_back_success: false,
    btn_loading: false,
    btn_text: "现在拍照",
    cn_selected: true,
    us_selected: false,
    progress: [0, 0]
  },
  onLoad: function (options) {
    this.setData({
      process: 0,
      country: "cn",
      description: "请对您的驾照正面拍摄一张照片",
      sample_image: app.globalData.API_RES + "/cn_dl_front.png"
    });
  },
  onShow: function () {
    if (this.data.process == 1) {
      if (this.data.country == "cn") {
        this.setData({
          description: "请对您的身份证正面拍摄一张照片",
          sample_image: app.globalData.API_RES + "/cn_id_front.png"
        });
      } else {
        this.setData({
          description: "请对您驾照背面拍摄一张照片",
          sample_image: app.globalData.API_RES + "/us_dl_back.png"
        });
      }
    }

    if (this.data.process == 2) {
        this.setData({
          btn_loading: true,
          btn_text: "上传中..."
        });

        if (this.data.country == "cn") {
          this.upload("dl_photo_front", this.data.cn_dl_photo_front, 0);
          this.upload("id_photo_front", this.data.cn_id_photo_front, 1);
        } else {
          this.upload("dl_photo_front", this.data.us_dl_photo_front, 0);
          this.upload("dl_photo_back", this.data.us_dl_photo_back, 1);
        }
    }
  },
  openCamera: function (event) {
    var id_key = "";

    if ((this.data.country == "cn") && (this.data.process == 0)) {
      id_key = "cn_dl_photo_front";
    }

    if ((this.data.country == "cn") && (this.data.process == 1)) {
      id_key = "cn_id_photo_front";
    }

    if ((this.data.country == "us") && (this.data.process == 0)) {
      id_key = "us_dl_photo_front";
    }

    if ((this.data.country == "us") && (this.data.process == 1)) {
      id_key = "us_dl_photo_back";
    }

    wx.navigateTo({
      url: '../camera/index?id_key=' + id_key
    });
  },
  upload: function(name, filePath, progess_id) {
    let that = this;

    let header = {
      "cookie": wx.getStorageSync("sessionid"),
      "Content-Type": "multipart/form-data"
    };

    let formData = {
      id_key: name,
      country: this.data.country
    };

    /* 
      console.log("form data:");
      console.log(formData);
      console.log("name:");
      console.log(name);
      console.log("filePath:");
      console.log(filePath);
    */

    const uploadTask = wx.uploadFile({
      url: app.globalData.API_ID_UPLOAD,
      filePath: filePath,
      name: name,
      header: header,
      formData: formData,
      success: function (res) {
        console.log(res);

        if ((that.data.country == "cn") && (name == "dl_photo_front")) {
          that.setData({
            cn_dl_photo_front_success: true
          });
        } else if ((that.data.country == "cn") && (name == "id_photo_front")) {
          that.setData({
            cn_id_photo_front_success: true
          });
        } else if ((that.data.country == "us") && (name == "dl_photo_front")) {
          that.setData({
            us_dl_photo_front_success: true
          });
        } else if ((that.data.country == "us") && (name == "dl_photo_back")) {
          that.setData({
            us_dl_photo_back_success: true
          });
        }

        if ((that.data.country == "cn") && (that.data.cn_dl_photo_front_success) && (that.data.cn_id_photo_front_success)) {
          console.log("cn total success");

          wx.navigateBack();
        }

        if ((that.data.country == "us") && (that.data.us_dl_photo_front_success) && (that.data.us_dl_photo_back_success)) {
          console.log("us total success")

          wx.navigateBack();
        }
      },
      fail: function (res) {
        //console.log(res);
      },
      complete: function () {
        //console.log("completed:");
      }
    });

    uploadTask.onProgressUpdate((res) => {
      var progress = that.data.progress;

      progress[progess_id] = res.progress;

      let pvalue = Math.min.apply(null, progress);

      //console.log(that.data.progress);

      this.setData({
        progress: progress,
        btn_text: "上传中(" + pvalue + "%)"
      });
    });
  },
  tapCN: function (e) {
    if(this.data.country == "us") {
      this.setData({
        process: 0,
        country: "cn",
        cn_selected: true,
        us_selected: false,
        description: "请对您驾照正面拍摄一张照片",
        sample_image: app.globalData.API_RES + "/cn_id_front.png"
      });
    }
  },
  tapUS: function (e) {
    if (this.data.country == "cn") {
      this.setData({
        process: 0,
        country: "us",
        cn_selected: false,
        us_selected: true,
        description: "请对您驾照正面拍摄一张照片",
        sample_image: app.globalData.API_RES + "/us_dl_front.png"
      });
    }
  }
})