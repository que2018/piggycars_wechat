
var app = getApp();
var util = require('../../utils/util.js');

Page({
  data: {
    image: "",
    showShare: false,
    show_loading: false
  },
  onLoad: function (options) {
    this.loadData(0);
  },
  loadData: function (refresh) {
    var that = this;

    that.setData({
      show_loading: true
    });

    wx.request({
      url: app.globalData.API_QRCODE + "?user_id=" + app.globalData.user_id + "&refresh=" + refresh,
      complete: function (res) {
        that.setData({
          show_loading: false
        });

        if(res.data.status == 1) {
          that.setData({
            image: app.globalData.BASE_URL + res.data.data.image,
            showShare: true
          });
        } else {
           wx.showToast({
              title: res.data.info,
              image: '/images/cry.png',
              duration: 2000,
              mask: true
            });
        }

        wx.hideNavigationBarLoading();
        wx.stopPullDownRefresh();
      }
    })
  },
  onShareAppMessage() {
    return {
      title: '投个车',
      desc: '注册投个车！',
      path: '/pages/home/index?referal_id=' + app.globalData.user_id,
      imageUrl: this.data.image
    }
  },

  onPullDownRefresh: function() {
    this.loadData(1);
  }
})