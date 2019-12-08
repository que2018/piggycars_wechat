
var app = getApp();

Page({
  data: {
    
  },
  onLoad: function (options) {

  },
  openCamera: function (event) {
    wx.navigateTo({
      url: '../camera/index'
    });
  }
})