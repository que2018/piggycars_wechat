
var app = getApp();

Page({
  data: {
    description: "",
    sample_image: ""
  },
  onLoad: function (options) {
    this.setData({
      description: "请对您驾照正面拍摄一张照片",
      sample_image: app.globalData.API_RES + "/id_cn.jpg"
    });
  },
  openCamera: function (event) {
    wx.navigateTo({
      url: '../camera/index'
    });
  }
})