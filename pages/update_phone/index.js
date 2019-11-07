var app = getApp();
Page({
  data: {
    old_phone: "",
    new_phone: "",
    selectValue:"1",
    show_loading: false,
    show_error: false,
    error_msg: "",
    currentStep: 0,
    inputStyle: "input-group"
  },
  onLoad: function (options) {
    this.setData({
      old_phone: decodeURIComponent(options.phone)
    })
  },

  step1FormSubmit(e) {
    var that = this;
    var value = e.detail.value
    that.setData({
      show_loading: true,
      show_error: false
    })
    wx.request({
      url: app.globalData.API_AUTHENTIC_PHONE_UPDATE,
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      data: { old_code: value.code, password: value.password, user_id: app.globalData.user_id },
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

  getOldSms(e) {
    var that = this;
    wx.request({
      url: app.globalData.API_AUTHENTIC_PHONE_UPDATE_GET_SMS,
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      data: { sid: 0, phone: that.data.old_phone, user_id: app.globalData.user_id },
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
      url: app.globalData.API_AUTHENTIC_PHONE_UPDATE_BIND_NEW,
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      data: { new_code: value.code, new_phone: value.phone, user_id: app.globalData.user_id },
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

  phoneBindInput: function (e) {
    this.setData({
      new_phone: e.detail.value
    });
  },

  getNewSms(e) {
    var that = this;
    wx.request({
      url: app.globalData.API_AUTHENTIC_PHONE_UPDATE_GET_NEW_SMS,
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      data: { sid: 0, phone: that.data.selectValue + that.data.new_phone, user_id: app.globalData.user_id },
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
  
  clickFinish: function (event) {
    wx.navigateBack({
      delta: 1
    })
  },

  optionTap(e) {
    let name = e.currentTarget.dataset.name
    let value = e.currentTarget.dataset.value
    this.setData({

      selectName: name,
      selectValue: value
    });
  }
})