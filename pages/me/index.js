
var util = require('../../utils/util.js');
var app = getApp();

Page({
  data: {
    version: "",
    referal_id: "",
    user_name: "",
    password: "",
    money: 0,
    phone: "",
    email:"",
    is_login: false,
    loading: false,
    show_loading: true
  },
  onLoad: function (options) {
    this.setData({ 
      version: app.globalData.version,
      referal_id: app.globalData.referal_id,
      user_name: app.globalData.user_name,
      password: "",
      money: app.globalData.money,
      is_login: app.globalData.is_login
    });

    if(app.globalData.is_login) {
      this.setData({
        version: app.globalData.version,
        user_name: app.globalData.user_name,
        money: app.globalData.money,
        show_loading: false,
        is_login: true
      });
    } else {
      this.setData({
        version: app.globalData.version,
        show_loading: false,
        is_login: false
      });
    }

    //this.wechatLogin();
  },
  onShow() {
    this.setData({
      user_name: app.globalData.user_name,
      password: "",
      is_login: app.globalData.is_login,
      phone: app.globalData.phone,
      email: app.globalData.email,
      money: app.globalData.money
    });
  },
  login: function (e) {
    var that = this;

    that.setData({
      loading: true
    });

    wx.login({
      success: function (res) {
        var code = res.code;

        wx.request({
          url: app.globalData.API_LOGIN,
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          method: "POST",
          data: util.json2Form({
            user_name: e.detail.value.user_name,
            password: e.detail.value.password,
            code: code
          }),
          complete: function (res) {
            that.setData({
              loading: false
            });

            if (res.data.status != 1) {
              wx.showToast({
                title: res.data.info,
                image: '/images/cry.png',
                duration: 2000,
                mask: true
              });
            } else {
              that.setData({
                is_login: true,
                user_name: res.data.data.user_name,
                email: res.data.data.email,
                phone: res.data.data.phone,
                money: res.data.data.money
              });

              app.globalData.is_login = true;
              app.globalData.user_id = res.data.data.user_id;
              app.globalData.user_name = res.data.data.user_name;
              app.globalData.email = res.data.data.email;
              app.globalData.phone = res.data.data.phone;
              app.globalData.money = res.data.data.money;
            }
          }
        });
      }
    });  
  },
  refresh: function (e) {
    if (app.globalData.user_id != ""){
      var that = this;

      that.setData({
        show_loading: true
      });

      wx.login({
        success: function (res) {
          var code = res.code;

          wx.request({
            url: app.globalData.API_REFRESH,
            header: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            method: "POST",
            data: util.json2Form({
              user_id: app.globalData.user_id,
              code: code
            }),
            complete: function (res) {
              that.setData({
                show_loading: false
              });

              if (res.data.status != 1) {
                wx.showToast({
                  title: "刷新失败",
                  image: '/images/cry.png',
                  duration: 2000,
                  mask: true
                });
              } else {
                that.setData({
                  user_name: res.data.data.user_name,
                  phone: res.data.data.phone,
                  email: res.data.data.email,
                  money: res.data.data.money
                });

                app.globalData.user_name = res.data.data.user_name;
                app.globalData.email = res.data.data.email;
                app.globalData.phone = res.data.data.phone;
                app.globalData.money = res.data.data.money;
              }
            }
          });
        }
      });
    }else{
      wx.stopPullDownRefresh();
    }
    wx.stopPullDownRefresh();
  },
  onPullDownRefresh: function () {
    this.refresh();
  },
  clickRegister: function (event) {
    wx.navigateTo({
      url: '../register/index'
    });
  },
  clickCharge: function (event) {
    wx.navigateTo({
      url: '../charge_option/index'
    });
  },
  clickWithdrawal: function (event) {
    wx.request({
      url: app.globalData.API_WITHDRAWAL_CHECK + "?user_id=" + app.globalData.user_id,
      complete: function (res) {
        if (res.data.status == 1) { //error
          wx.navigateTo({
            url: '../withdrawal_error/index?phone=' + res.data.data.phone + '&name=' + res.data.data.name + '&black=' + res.data.data.black
          });
        } else {
          wx.navigateTo({
            url: '../withdrawal/index'
          });
        }
      }
    });
  }, 
  updatePhone:function (event) {
    wx.navigateTo({
      url: '../update_phone/index?phone=' + app.globalData.phone
    });
  },
  updateEmail: function (event) {
    wx.navigateTo({
      url: '../update_email/index?email=' + app.globalData.email
    });
  },
  authPhone: function (event) {
    wx.navigateTo({
      url: '../authentic_phone/index'
    });
  },
  authEmail: function (event) {
    wx.navigateTo({
      url: '../authentic_email/index'
    });
  },
  clickOrder: function (event) {
    wx.navigateTo({
      url: '../order/index'
    });
  },
  clickTransition: function (event) {
    wx.navigateTo({
      url: '../finance/index'
    });
  },
  clickReferal: function (event) {
    wx.navigateTo({
      url: '../referal/index'
    });
  },
  clickVersion: function (event) {
    wx.navigateTo({
      url: '../version/index'
    });
  },
  clickLogout: function (event) {
    wx.navigateTo({
      url: '../logout/index'
    });
  }
})