
let app = getApp();
let wxParse = require('../../utils/wxParse/wxParse.js');

Page({
  data: {
    id: '',
    title: '',
    image: '../../images/placeholder.jpg',
    description: '',
    show_loading: true
  },
  onLoad: function (options) {
    this.setData({
      id: options.id
    });

    this.loadData(options.id);    
  },
  loadData: function (post_id) {
    let that = this;

    wx.request({
      url: app.globalData.API_COMMUNITY_POST + "?id=" + post_id,
      complete: function (res) {
        //console.log(res.data);

        var image = "";

        if(res.data.data.image) {
          image = app.globalData.API_RES_INFO + "/post/orig/" + res.data.data.image;
        } else {
          image = "../../images/placeholder.jpg";
        }

        var description = res.data.data.description;  
        wxParse.wxParse('desp_html', 'html', description, that, 5);  

        that.setData({
          show_loading: false,
          image: image,
          title: res.data.data.title,
          description: res.data.data.description
        });
      }
    });
  },
  onShareAppMessage: function (res) {
    let path = "/pages/community_post/index?id=" + this.data.id;
 
    return {
      title: this.data.title,
      imageUrl: this.data.image,
      path: path, 
      success: function (res) {},
      fail: function (res) {}
    }
  },
  onShareTimeline: function () {
    return {
      title: this.data.title,
      imageUrl: this.data.image
    }
  }
});