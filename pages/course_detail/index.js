
var app = getApp();
var wxParse = require('../../utils/wxParse/wxParse.js');

Page({
  data: {
    token: "",
    auth_login: false,
    validated: false,
    show_loading: true,
    course_id: 0,
    title: "",
    description: "",
    is_trial: false,
    professor_name: "",
    professor_portrait: "../../images/portrait.png",
    video_poster: "",
    video_url: "",
    video_height: 0
  },
  onLoad: function (options) {
    this.setData({
      course_id: decodeURIComponent(options.course_id),
    });

    var that = this;

    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          video_height: Math.floor(res.windowWidth * 9 / 16)
        });
      }
    });
  },
  onShow: function (options) {
    this.loadData()
  },
  loadData() {
    this.setData({
      token: app.globalData.TOKEN,
      auth_login: app.globalData.AUTH_LOGIN
    });

    var that = this;

    wx.request({
      url: app.globalData.API_CLASS + "?course_id=" + this.data.course_id,

      complete: function (res) {
        that.setData({
          title: res.data.course.title,
          description: res.data.course.description,
          is_trial: res.data.course.is_trial,
          professor_name: res.data.course.professor_name,
          professor_portrait: res.data.course.professor_portrait,
          video_poster: res.data.course.video_poster,
          video_url: res.data.course.video_url
        });

        var description = res.data.course.description;  
        wxParse.wxParse('desp_html', 'html', description, that, 5);  

        if (app.globalData.course_ids.length) {
          for (let i = 0; i < app.globalData.course_ids.length; ++i) {
            var course_id = app.globalData.course_ids[i];

            if (that.data.course_id == course_id) {
              that.setData({
                validated: true
              });
            
              break;
            }
          }
        }

        that.setData({
          show_loading: false
        });
      }
    });
  },
  click: function () {
    app.globalData.REDIRECT = "../course_detail/index?course_id=" + this.data.course_id

    wx.switchTab({
      url: "../me/index"
    });
  }
})
