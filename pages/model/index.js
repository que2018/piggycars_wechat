
var util = require('../../utils/util.js');
var app = getApp();

Page({
  data: {

  },
  onLoad: function (options) {

  },
  clickArticle: function (event) {
    var tag = event.currentTarget.dataset.tag

    if(tag == "help") {
      wx.navigateTo({
        url: '../article/index?cid=3'
      });
    }

    if (tag == "corp") {
      wx.navigateTo({
        url: '../article/index?cid=5'
      });
    }

    if (tag == "model") {
      wx.navigateTo({
        url: '../article/index?cid=2'
      });
    }

    if (tag == "about") {
      wx.navigateTo({
        url: '../article/index?cid=1'
      });
    }

    if (tag == "news") {
      wx.navigateTo({
        url: '../article/index?cid=30'
      });
    }
  },
})