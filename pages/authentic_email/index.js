var app = getApp();

Page({

  data: {
    email: "",
    show_loading: false,
    show_error: false,
    error_msg: "",
    currentStep: 0,
    inputStyle:"input-group"
  },

  onLoad: function (options) {

  },

  step1FormSubmit(e) {
    var that = this;
    var value = e.detail.value
    that.setData({
      show_loading: true,
      show_error: false
    })
    wx.request({
      url: app.globalData.API_AUTHENTIC_EMAIL,
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      data: { email: value.email, password: value.password, user_id: app.globalData.user_id },
      complete: function (res) {
        if (res.data.status == 1) { //error
          that.setData({
            show_loading: false,
            show_error: true,
            error_msg: res.data.data.msg
          })
        } else {
          that.setData({
            email: res.data.data.email_return.data.email,
            show_error: false,
            show_loading: false,
            currentStep: "1",
          })
        }
      },
    });
  },

  step2FormSubmit(e) {
    var that = this;
    var value = e.detail.value
    that.setData({
      show_loading: true,
      show_error: false
    })
    wx.request({
      url: app.globalData.API_AUTHENTIC_EMAIL_BIND,
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      data: { code: value.code, email: that.data.email, user_id: app.globalData.user_id },
      complete: function (res) {
        if (res.data.status == 1) { //error
          that.setData({
            show_loading: false,
            show_error: true,
            error_msg: res.data.data.msg
          })
        } else {
          that.setData({
            show_error: false,
            show_loading: false,
            currentStep: "2",
          })
        }
      },
    });
  },

  clickFinish: function (event) {
    wx.navigateBack({
      delta: 1
    })
  },

  checkEmail: function (e) {
    var that = this;
    let str = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/
    if (str.test(e.detail.value)) {
      that.setData({
        inputStyle: "input-group"
      })
    } else {
      that.setData({
        inputStyle: "input-group error",
      })
    }
  },
})