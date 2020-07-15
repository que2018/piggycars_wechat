
var app = getApp();
var util = require('../../utils/util.js');

Component({
  properties: {
    message: {
      type: Array,
      value: ''
    }
  },
  data: {
    order_id: 0,
    checkout_year: "",
    checkout_make: "",
    checkout_model: "",
    checkout_image: "",
    checkout_payment_down: 0,
    checkout_payment_down_tax: 0,
    checkout_payment_total: 0,
    btn_wechat_loading: false,
    btn_card_loading: false
  },
  lifetimes: {
    attached: function () {
      this.setData({
        order_id: app.globalData.order_id,
        checkout_year: app.globalData.checkout_year,
        checkout_make: app.globalData.checkout_make,
        checkout_model: app.globalData.checkout_model,
        checkout_image: app.globalData.checkout_image,
        checkout_payment_down: app.globalData.checkout_payment_down,
        checkout_payment_down_tax: app.globalData.checkout_payment_down_tax,
        checkout_payment_down_total: app.globalData.checkout_payment_down_total
      });
    }
  },
  methods: {
    wechatPay: function (e) {
      var that = this;

      that.setData({
        btn_wechat_loading: true
      });

      wx.login({
        success: function (res) {
          var code = res.code;

          let header = {
            'content-type': 'application/x-www-form-urlencoded',
            'cookie': wx.getStorageSync("sessionid")
          };

          wx.request({
            url: app.globalData.API_WECHAT_AUTH,
            header: header,
            method: "POST",
            data: util.json2Form({
              code: code
            }),
            complete: function (res) {
              console.log(res.data);

              that.setData({
                btn_wechat_loading: false
              });

              if (res.data.success) {
                var nonceStr = res.data.data.nonceStr;
                var paySign = res.data.data.paySign;
                var signType = res.data.data.signType;
                var timeStamp = res.data.data.timeStamp;
                var wechatPackage = res.data.data.wechatPackage;

                wx.requestPayment({
                  'timeStamp': timeStamp,
                  'nonceStr': nonceStr,
                  'package': wechatPackage,
                  'signType': signType,
                  'paySign': paySign,
                  'success': function (res) {
                    wx.redirectTo({
                      url: '../checkout_success/index'
                    });
                  },
                  'fail': function (res) {
                    wx.navigateTo({
                      url: '../charge_fail/index'
                    });
                  },
                  'complete': function (res) {
                    that.setData({
                      loading: false
                    });
                  }
                });
              } else {
                that.setData({
                  amount: ""
                });

                let data = { messages: "" }
                data.messages = "内部技术错误";
                that.triggerEvent('notification', data);
              }
            }
          });
        }
      });
    },
    cardPay: function (e) {
      let data = {
        show_checkout_sms: false,
        show_checkout_address: false,
        show_checkout_id: false,
        show_checkout_plan: false,
        show_checkout_coupon: false,
        show_checkout_payment: false,
        show_checkout_card: true
      }

      this.triggerEvent('notification', data);
    }
  }
})