
var app = getApp();

Page({
  data: {
    version: app.globalData.VERSION,
    name: app.globalData.name,
    token_value: '',
    loading: false,
    show_form: true,
    show_profile: false
  },
  onLoad: function (options) {
    if (app.globalData.AUTH_LOGIN) {
      this.setData({
        loading: false,
        show_form: false,
        show_profile: true
      });
    } else {
      this.reset();
    }
  },
  login: function (e) {
    var that = this;

    that.setData({
      loading: true
    });

    wx.request({
      url: app.globalData.API_CHECK_TOKEN + "?token=" + e.detail.value.token,

      complete: function (res) {
        if (res.data.find) {
          wx.login({
            success: function (res) {
              wx.request({
                url: app.globalData.API_CHECK_WECHAT + "?code=" + res.code + '&token=' + e.detail.value.token,
                complete: function (res) {
                  that.setData({
                    loading: false
                  });

                  if (res.data.verified) {
                    app.globalData.AUTH_LOGIN = true;
                    app.globalData.TOKEN = res.data.token;
                    app.globalData.token_id = res.data.token_id;
                    app.globalData.name = res.data.name;
                    app.globalData.course_ids = res.data.course_ids;
                    app.globalData.exam_enabled = res.data.exam_enabled;

                    that.setData({
                      show_form: false,
                      show_profile: true
                    });

                    if (app.globalData.REDIRECT) {
                      wx.navigateTo({
                        url: app.globalData.REDIRECT
                      });
                    }
                  } else {
                    app.globalData.AUTH_LOGIN = false;

                    that.reset();

                    wx.showToast({
                      title: '微信验证失败',
                      image: '/images/cry.png',
                      duration: 2000,
                      mask: true
                    });
                  }
                }
              })
            }
          });
        } else {
          that.reset();

          wx.showToast({
            title: '亲，代码错误',
            image: '/images/cry.png',
            duration: 2000,
            mask: true
          })
        }
      }
    });
  },
  logout: function (event) {
    app.globalData.AUTH_LOGIN = false;
    app.globalData.TOKEN = "";

    this.reset();
  },
  reset: function () {
    this.setData({
      token_value: '',
      loading: false,
      show_form: true,
      show_profile: false
    });
  },
  onPullDownRefresh: function () {
    var that = this;

    if(app.globalData.AUTH_LOGIN) {
      wx.login({
        success: function (res) {
          wx.request({
            url: app.globalData.API_CHECK_WECHAT_BG + "?code=" + res.code,
            complete: function (res) {
              if (res.data.is_login) {
                that.setData({
                  name: res.data.name
                });

                app.globalData.AUTH_LOGIN = true;
                app.globalData.TOKEN = res.data.token;
                app.globalData.token_id = res.data.token_id;
                app.globalData.name = res.data.name;
                app.globalData.course_ids = res.data.course_ids;
                app.globalData.exam_enabled = res.data.exam_enabled;
              } else {
                app.globalData.AUTH_LOGIN = false;
                that.reset();
              }

              wx.hideNavigationBarLoading();
              wx.stopPullDownRefresh();
            }
          })
        }
      });
    } else {
      this.reset();

      wx.hideNavigationBarLoading();
      wx.stopPullDownRefresh();
    }
  }
})