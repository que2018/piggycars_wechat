var app = getApp();

Page({

  data: {
    phone: "",
    show_loading: false,
    error_msg: "",
    currentStep: 0,
    selectValue: '1',
    selectName: '',
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
      url: app.globalData.API_AUTHENTIC_PHONE,
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      data: { password: value.password, user_id: app.globalData.user_id},
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
            currentStep: "1",
          })
        }
      },
    });
  },

  phoneBindInput: function (e) {
    this.setData({
      phone: e.detail.value
    });
  },

  getSms(e) {
    var that = this;
    wx.request({
      url: app.globalData.API_AUTHENTIC_PHONE_GET_SMS,
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      data: { sid: 0, phone: that.data.selectValue + that.data.phone, user_id: app.globalData.user_id },
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
      url: app.globalData.API_AUTHENTIC_PHONE_BIND,
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      data: { code: value.code, phone: value.phone, user_id: app.globalData.user_id },
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

  //API_AUTHENTIC_PHONE_GET_SMS
  optionTap(e) {
    let name = e.currentTarget.dataset.name
    let value = e.currentTarget.dataset.value
    this.setData({

      selectName: name,
      selectValue: value
    });
  }
})