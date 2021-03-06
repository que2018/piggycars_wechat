
let app = getApp();
let wxParse = require('../../utils/wxParse/wxParse.js');

Page({
  data: {
    id: "",
    title: "",
    content: "",
    image: "",
    show_loading: true
  },
  onLoad: function (options) {
    this.setData({
      id: decodeURIComponent(options.id)
    });

    this.loadData();
  },
  loadData: function () {
    var that = this;

    wx.request({
      url: app.globalData.API_BLOG_DETAIL + "/" + this.data.id,
      complete: function (res) {
        console.log(res.data);

        if (res.data.success) {
          that.setData({
            title: res.data.data.heading_title,
            content: res.data.data.content,
            image: app.globalData.API_RES_INFO + "/article/lg/" + res.data.data.image
          });

          wxParse.wxParse('desp_html', 'html', res.data.data.content, that, 5); 

          that.setData({
            show_loading: false
          }); 
        }
      }
    });
  }
})