
var util = require('../../utils/util.js');
var app = getApp();

Page({
  data: {
    project_id: 0,
    project_name: "",
    last_money: 0,
    money: 0,
    loading: false,
    show_loading: false,
    inputStyle: "input-group",
    input_pwd: "",
    input_money: "",
    email: "",
    hiddenModal: true
  },
  onLoad: function (options) {
    this.setData({
      money: app.globalData.money,
      project_id: decodeURIComponent(options.project_id)
    });

    this.loadData();
  },
  loadData: function () {
    var that = this;

    wx.request({
      url: app.globalData.API_APPLY + "?project_id=" + this.data.project_id,
      complete: function (res) {
        that.setData({
          show_loading: false,
          project_name: res.data.data.names,
          last_money: res.data.data.last_money
        })

        wx.hideNavigationBarLoading();
        wx.stopPullDownRefresh();
      }
    })
  },
  apply: function (event) {
    var that = this;
    //add by Neil start
    if (that.data.money < 100){
      wx.redirectTo({
        url: '../recharge_notify/index?balance=' + that.data.money + '&project_id=' + that.data.project_id
      });
    }
    //add by Neil start
    else if (event.detail.value.money == "") {
      wx.showToast({
        title: "请输入金额",
        image: '/images/cry.png',
        duration: 1000,
        mask: true
      });
    }else if (event.detail.value.pwd == ""){
      wx.showToast({
        title: "请输入密码", 
        image: '/images/cry.png',
        duration: 1000,
        mask: true
      });
    } else {
      that.setData({
        loading: true,
        input_pwd: event.detail.value.pwd,
        input_money: event.detail.value.money
      });
      wx.request({
        url: app.globalData.API_APPLY_EMAIL_CHECK + "?user_id=" + app.globalData.user_id,
        complete: function (res) {
          if (res.data.status == 1) { //error
            that.setData({
              hiddenModal: false
            });
          } else {
            var data = util.json2Form({
              user_id: app.globalData.user_id,
              project_id: that.data.project_id,
              pwd: that.data.input_pwd,
              money: that.data.input_money,
              email: res.data.data.email,
              gift_money: 0
            })
            that.sendApply(data);
          }
        }
      });
    }
  },
  cancel: function () {
    var data = util.json2Form({
      user_id: app.globalData.user_id,
      project_id: this.data.project_id,
      pwd: this.data.input_pwd,
      money: this.data.input_money,
      gift_money: 0
    })
    this.sendApply(data);
  },
  confirm: function () {
    if (this.checkEmail(this.data.email)) {
      var data = util.json2Form({
        user_id: app.globalData.user_id,
        project_id: this.data.project_id,
        pwd: this.data.input_pwd,
        money: this.data.input_money,
        email: this.data.email,
        gift_money: 0
      })
      this.sendApply(data);
    }else{
      wx.showToast({
        title: "邮箱错误",
        image: '/images/cry.png',
        duration: 1000,
        mask: true
      });
    }
  },

  sendApply: function (data) {
    var that = this;
    wx.showLoading({
      title: '',
      mask: true
    })
    wx.request({
      url: app.globalData.API_APPLY_APPLY,
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      data: data,
      complete: function (res) {
        console.log(res.data);

        that.setData({
          loading: false,
          hiddenModal: true
        });
        wx.hideLoading()

        if (res.data.status == 0) {
          wx.redirectTo({
            url: '../apply_success/index?amount=' + that.data.money + '&order_id=' + res.data.data.order_id
          });
        } else {
          wx.showToast({
            title: res.data.info,
            image: '/images/cry.png',
            duration: 2000,
            mask: true
          });
        }
      }
    });
  },
  inputEmail: function (e) {
    var that = this;
    this.setData({
      email: e.detail.value
    })
  },
  checkEmail: function (email) {
    let str = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/
    if (str.test(email)) {
      return true
    } else {
      return false
    }
  },
  onPullDownRefresh: function () {
    this.loadData();
  }
})