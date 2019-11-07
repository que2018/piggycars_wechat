
var app = getApp();

Page({
  data: {
    referal_id:"",
    countryList: [
      { name: "美国(+1)", value: "+1"},
      { name: "中国(+86)", value: "+86"}],
    selectValue: '1',
    selectName: '',
    error_msg: '',
    show_error: false,
    email:'',
    phone:'',
    temp_user: '',
    currentTab: 0,
    inputStyle: "input-group",
    show_loading: false,
    password: '',
    trading_password: '',
    inputStyle_lpw: 'input-group',
    inputStyle_lpw_re: 'input-group',
    inputStyle_tpw: 'input-group',
    inputStyle_tpw_re: 'input-group',
    tip: 'tip hide',
    payTip: 'tip hide',
    base_url: app.globalData.BASE_URL
  },
  onLoad: function (options) {
    this.setData({
      referal_id: app.globalData.referal_id,
    })
  },
  swiperTab: function (e) {
    var that = this;
    that.setData({
      currentTab: e.detail.current
    });
  },
  stopTouchMove: function () {
    return false;
  },
  //点击切换
  clickTab: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current,
        show_error: false
      })
    }
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

  checkLoginPassword: function (e) {
    var that = this; 
    let str = /^[0-9A-Za-z]{6,16}$/
    //let str = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/
    if (str.test(e.detail.value)) {
      that.setData({
        inputStyle_lpw: "input-group",
        password: e.detail.value
      })
    } else if (e.detail.value == '') {
      that.setData({
        inputStyle_lpw: "input-group"
      })
    } else {
      that.setData({
        inputStyle_lpw: "input-group error",
      })
    }
  },
  checkTradingPassword: function (e) {
    var that = this;
    let str = /^[0-9A-Za-z]{6,16}$/
    if (str.test(e.detail.value) && e.detail.value != that.data.password) {
      that.setData({
        inputStyle_tpw: "input-group",
        trading_password: e.detail.value
      })
    } else if (e.detail.value == '') {
      that.setData({
        inputStyle_tpw: "input-group"
      })
    }else {
      that.setData({
        inputStyle_tpw: "input-group error",
      })
    }
  },

  checkLoginPasswordRe: function (e) {
    var that = this;
    if (that.data.password == e.detail.value) {
      that.setData({
        inputStyle_lpw_re: "input-group"
      })
    } else {
      that.setData({
        inputStyle_lpw_re: "input-group error",
      })
    }
  },
  checkTradingPasswordRe: function (e) {
    var that = this;
    if (that.data.trading_password == e.detail.value) {
      that.setData({
        inputStyle_tpw_re: "input-group"
      })
    } else {
      that.setData({
        inputStyle_tpw_re: "input-group error",
      })
    }
  },

  emailFormSubmit(e) {
    var that = this;
    var value = e.detail.value
    that.setData({
      show_loading: true,
      show_error: false
    })
    wx.request({
      url: app.globalData.API_REGISER_EMAIL,
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      data: { email: value.email},
      complete: function (res) {
        if (res.data.status == 1){ //error
          that.setData({
            show_loading: false,
            show_error: true,
            error_msg: res.data.data.msg
          })
        }else{
          that.setData({
            email: value.email,
            show_error: false,
            show_loading: false,
            currentEmailStep: "1",
            show_error: false
          })
        }
      },
    });
  },
  emailActiveSubmit(e) {
    var that = this;
    var value = e.detail.value
    that.setData({
      show_loading: true,
      show_error: false
    })
    wx.request({
      url: app.globalData.API_ACTIVE_EMAIL,
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      data: { code: value.code, email: that.data.email },
      complete: function (res) {
        if (res.data.status == 1) { //error
          that.setData({
            show_loading: false,
            show_error: true,
            error_msg: res.data.data.msg
          })
        } else {
          that.setData({
            temp_user: res.data.data.temp_user,
            show_loading: false,
            show_error: false,
            currentEmailStep: "2",
            show_error: false
          })
        }
      },
    });
  },
  settingSubmit(e) {
    var that = this;
    var value = e.detail.value
    if (that.data.temp_user.email){
      var data = {
        recommend: value.recommend,
        user_name: value.user_name,
        password: value.password,
        password_re: value.password_re,
        trading_password: value.trading_password,
        trading_password_re: value.trading_password_re,
        email: that.data.temp_user.email,
        code: that.data.temp_user.code,
        pid: that.data.temp_user.pdd
      }
    }else{
      var data = {
        recommend: value.recommend,
        user_name: value.user_name,
        password: value.password,
        password_re: value.password_re,
        trading_password: value.trading_password,
        trading_password_re: value.trading_password_re,
        phone: that.data.temp_user.phone,
        code: that.data.temp_user.code,
        pid: that.data.temp_user.pdd
      }
    }
   
    that.setData({
      show_loading: true,
      show_error: false
    })
    wx.request({
      url: app.globalData.API_SETTING_PW,
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      data: data,
      complete: function (res) {
        if (res.data.status == 1) { //error
          that.setData({
            show_loading: false,
            show_error: true,
            error_msg: res.data.data.error
          })
        } else {
          that.setData({
            success: true,
            show_loading: false,
            show_error: false,
            currentEmailStep: "3",
            currentPhoneStep: "3",//TODO
            show_error: false
          })
        }
      },
    });
  },
  phoneFormSubmit(e) {
    var that = this;
    var value = e.detail.value
    that.setData({
      show_loading: true,
      show_error: false
    })
    wx.request({
      url: app.globalData.API_REGISER_PHONE,
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      data: { phone: that.data.selectValue + value.phone },
      complete: function (res) {
        if (res.data.status == 1) { //error
          that.setData({
            show_loading: false,
            show_error: true,
            error_msg: res.data.data.msg
          })
        } else {
          that.setData({
            phone: value.phone,
            show_error: false,
            show_loading: false,
            currentPhoneStep: "1",
            show_error: false
          })
        }
      },
    });
  },

  phoneActiveSubmit(e) {
    var that = this;
    var value = e.detail.value
    that.setData({
      show_loading: true,
      show_error: false
    })
    wx.request({
      url: app.globalData.API_ACTIVE_PHONE,
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      data: { code: value.code, phone: that.data.selectValue + that.data.phone },
      complete: function (res) {
        if (res.data.status == 1) { //error
          that.setData({
            show_loading: false,
            show_error: true,
            error_msg: res.data.data.msg
          })
        } else {
          that.setData({
            temp_user: res.data.data.temp_user,
            show_loading: false,
            show_error: false,
            currentPhoneStep: "2",
            show_error: false
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

  clickTipPass: function (event) {
    var that = this;
    that.setData({
      tip: "tip show"
    })
  },

  clickTipPayPass: function (event) {
    var that = this;
    that.setData({
      payTip: "tip show"
    })
  },

  click_form: function (event) {
    var that = this;
    that.setData({
      tip: "tip hide",
      payTip: "tip hide"
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