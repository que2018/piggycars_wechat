var app = getApp();

Page({

  data: {
    locationList: [
      { type: "1", name: "二代身份证", tips: "身份证号码为15位或者18位" },
      { type: "2", name: "回乡证", tips: "香港身份证格式是：a-123456-(b);澳门身份证格式是：1-234567-（8）" },
      { type: "3", name: "台胞证/入境证明", tips: "台胞证号码为8位或10位" },
      { type: "4", name: "护照", tips: "由8-14个字符组成，并以字母开头" }
    ],
    selectValue: 1,
    show_error: false,
    show_loading: false,
    currentStep: 0,
    certificate_info: "",
  },
  
  onLoad: function (options) {

  },

  step1FormSubmit(e) {
    var that = this;
    var value = e.detail.value;
    var type = this.data.selectValue;
    that.setData({
      show_loading: true,
      show_error: false
    })
    wx.request({
      url: app.globalData.API_AUTHENTIC_NAME,
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      data: { names: value.names, names2: value.names2, id_number: value.id_number, id_number2: value.id_number2, type: type, user_id: app.globalData.user_id },
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
            certificate_info: res.data.data.data,
            currentStep: "1",
          })
        }
      },
    });
  },

  step2FormSubmit(e) {
    var that = this;
    var value = e.detail.value;
    var type = this.data.selectValue;
    that.setData({
      show_loading: true,
      show_error: false
    })
    wx.request({
      url: app.globalData.API_AUTHENTIC_NAME_CER,
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      data: { name_authentic_tmp: JSON.stringify(that.data.certificate_info) },
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
      delta: 2
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