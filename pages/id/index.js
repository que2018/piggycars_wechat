
var app = getApp();
var util = require('../../utils/util.js');

Page({
  data: {
    process: 0,
    country: "cn",
    description: "",
    sample_image: "",
    id_paths: {
      "cn_dl_photo_front": "",
      "cn_id_photo_front": "",
      "us_dl_photo_front": "",
      "us_dl_photo_back": ""
    }
  },
  onLoad: function (options) {
    this.setData({
      description: "请对您驾照正面拍摄一张照片",
      sample_image: app.globalData.API_RES + "/id_cn.jpg"
    });

    //var pages = getCurrentPages();
    //var currPage = pages[pages.length - 1];   
    //var prevPage = pages[pages.length - 2];
    //console.log(prevPage.route);
  },
  onShow: function () {
    if (this.data.process == 2) {
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

    let formData = util.json2Form({
      name: "id_upload",
      country: this.data.country
    });

    wx.uploadFile({
      url: app.globalData.API_ID_UPLOAD,
      filePath: filePath,
      name: name,
      header: header,
      formData: formData,
      success: function (res) {
        console.log(res);
      },
      fail: function (e) {
        console.log(res);
      },
      complete: function () {
        console.log(res);
      }
    })
  }
})