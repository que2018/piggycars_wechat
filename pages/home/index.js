
var util = require('../../utils/util.js');
var app = getApp();

Page({
  data: {
    adverts: "",
    projects: "",
    show_loading: true
  },
  onLoad: function (options) {
    var obj = wx.getLaunchOptionsSync()
    if (obj.query.referal_id != undefined){
      app.globalData.referal_id = obj.query.referal_id
    }
    this.loadData();
  },

  onShow: function (options) {

  },

  loadData: function () {
    var that = this;

    wx.request({
      url: app.globalData.API_HOME,
      complete: function (res) {
        that.setData({
          adverts: res.data.data.adverts,
          projects: res.data.data.projects
        })

        wx.hideNavigationBarLoading();
        wx.stopPullDownRefresh();
      }
    })

    this.wechatLogin();
  },

  wechatLogin: function (e) {
    var that = this;
    
    wx.login({
      success: function (res) {
        wx.request({
          url: app.globalData.API_LOGIN_WECHAT + "?code=" + res.code,
          complete: function (res) {
            if (res.data.status == 1) {
              that.setData({
                show_loading: false
              });

              app.globalData.is_login = true;
              app.globalData.user_id = res.data.data.user_id;
              app.globalData.user_name = res.data.data.user_name;
              app.globalData.email = res.data.data.email;
              app.globalData.phone = res.data.data.phone;
              app.globalData.money = res.data.data.money;
              
            } else {
              that.setData({
                is_login: false,
                show_loading: false
              });
              //wx.hideLoading()
            }

            wx.showTabBar({
              aniamtion: true,
              success: function (res) { },
              fail: function (res) { },
              complete: function (res) { },
            })

            wx.hideNavigationBarLoading();
            wx.stopPullDownRefresh();
          }
        })
      }
    });
  },
  clickProject: function (event) {
    var project_id = event.currentTarget.dataset.project_id

    wx.navigateTo({
      url: '../project_detail/index?project_id=' + project_id
    });
  },
  clickAdvert: function (event) {
    var arcitle_id = event.currentTarget.dataset.arcitle_id
    if (arcitle_id != '#'){
      wx.navigateTo({
        url: '../article_detail/index?cid=30&article_id=' + arcitle_id
      });
    }
  },
  clickApply: function (event) {
    if(app.globalData.is_login) {
      var project_id = event.currentTarget.dataset.project_id

      wx.navigateTo({
        url: '../apply/index?project_id=' + project_id
      });
    } else {
      wx.switchTab({
        url: '../me/index'
      }); 
    }
  },
  onPullDownRefresh: function () {
    this.loadData();
  }
})
