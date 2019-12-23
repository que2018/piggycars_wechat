
var app = getApp();
var util = require('../../utils/util.js');

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
    btn_loading: false,
    btn_text: "现在拍照",
    cn_selected: true,
    us_selected: false
  },
  onLoad: function (options) {
    this.setData({
      process: 0,
      country: "cn",
      description: "请对您的驾照正面拍摄一张照片",
      sample_image: app.globalData.API_RES + "/cn_dl_front.jpg"
    });
  },
  onShow: function () {
    if (this.data.process == 1) {
      if (this.data.country == "cn") {
        this.setData({
          description: "请对您的身份证正面拍摄一张照片",
          sample_image: app.globalData.API_RES + "/cn_id_front.jpg"
        });
      } else {
        this.setData({
          description: "请对您驾照背面拍摄一张照片",
          sample_image: app.globalData.API_RES + "/us_dl_back.jpg"
        });
      }
    }

    if (this.data.process == 2) {
        this.setData({
          btn_loading: true,
          btn_text: "上传中..."
        });

        if (this.data.country == "cn") {
          this.upload("dl_photo_front", this.data.cn_dl_photo_front);
          this.upload("id_photo_front", this.data.cn_id_photo_front);
        } else {
          this.upload("dl_photo_front", this.data.us_dl_photo_front);
          this.upload("id_photo_back", this.data.us_id_photo_front);
        }
    }
  },
  openCamera: function (event) {
    var id_key = "";

    if((this.data.contry == "cn") && (this.data.process == 0)) {
      id_key = "cn_dl_photo_front";
    }

    if ((this.data.contry == "cn") && (this.data.process == 1)) {
      id_key = "cn_id_photo_front";
    }

    if ((this.data.contry == "us") && (this.data.process == 0)) {
      id_key = "us_dl_photo_front";
    }

    if ((this.data.contry == "us") && (this.data.process == 1)) {
      id_key = "us_dl_photo_back";
    }

    wx.navigateTo({
      url: '../camera/index?id_key=' + id_key
    });
  },
  upload: function(name, filePath) {
    let header = {
      "cookie": wx.getStorageSync("sessionid"),
      "Content-Type": "multipart/form-data"
    };

    let formData = {
      name: "id_upload",
      country: this.data.country
    };

    wx.uploadFile({
      url: app.globalData.API_ID_UPLOAD,
      filePath: filePath,
      name: name,
      header: header,
      formData: formData,
      success: function (res) {
        console.log(res);
      },
      fail: function (res) {
        console.log(res);
      },
      complete: function () {
        /* this.setData({
          btn_loading: false,
          btn_text: "现在拍照"
        }); */
      }
    })
  },
  tapCN: function (e) {
    if(this.data.country == "us") {
      this.setData({
        process: 0,
        country: "cn",
        cn_selected: true,
        us_selected: false,
        description: "请对您驾照正面拍摄一张照片",
        sample_image: app.globalData.API_RES + "/cn_id_front.jpg"
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
        sample_image: app.globalData.API_RES + "/us_dl_front.jpg"
      });
    }
  }
})