
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
    country_code: "",
    phone_local: "",
    phone: "",
    code: "",
    address_1: "",
    address_2: "",
    city: "",
    zone: "",
    country: "",
    postcode: "",
    country: "",
    btn_addr_loading: false
  },
  lifetimes: {
    attached: function () {
      this.setData({
        country_code: app.globalData.country_code,
        phone_local: app.globalData.phone_local,
        phone: app.globalData.phone,
        code: app.globalData.code,
        address_1: app.globalData.address.address_1,
        address_2: app.globalData.address.address_2,
        city: app.globalData.address.city,
        zone: app.globalData.address.zone,
        country: app.globalData.address.country,
        postcode: app.globalData.address.postcode
      });

      this.alert = this.selectComponent("#alert");
    }
  },
  methods: {
    addr: function (e) {
      var that = this;

      that.setData({
        btn_addr_loading: true
      });

      wx.request({
        header: {
          'cookie': wx.getStorageSync("sessionid"),
          "Content-Type": "application/x-www-form-urlencoded"
        },
        url: app.globalData.API_ADDR,
        method: "POST",
        data: util.json2Form({
          "country_code": that.data.country_code,
          "phone": that.data.phone_local,
          "code[sms]": that.data.code,
          "address_1": e.detail.value.address_1,
          "address_2": e.detail.value.address_2,
          "city": e.detail.value.city,
          "zone": e.detail.value.zone,
          "postcode": e.detail.value.postcode,
          "country": e.detail.value.country
        }),
        complete: function (res) {
          that.setData({
            btn_addr_loading: false
          });

          //console.log(res.data);

          if (res.data.success) {
            let data = {
              show_checkout_sms: false,
              show_checkout_address: false,
              show_checkout_id: false,
              show_checkout_plan: true,
              show_checkout_coupon: false,
              show_checkout_payment: false,
              show_checkout_card: false
            }

            that.triggerEvent('notification', data);
          } else {
            var messages = [];

            if (res.data.code == "error_form_error") {
              if (res.data.form_error["code[sms]"]) {
                let message = "输入的短信代码有误哦";
                messages.push(message);

                let data = {
                  show_checkout_sms: true,
                  show_checkout_address: false,
                  show_checkout_id: false,
                  show_checkout_plan: true,
                  show_checkout_coupon: false,
                  show_checkout_payment: false,
                  show_checkout_card: false,
                  messages: messages
                }

                that.triggerEvent('notification', data);
              }
            }

            if (res.data.code == "error_form_error_code") {
              let message = "输入的短信代码有误哦";
              messages.push(message);

              let data = {
                show_checkout_sms: true,
                show_checkout_address: false,
                show_checkout_id: false,
                show_checkout_plan: true,
                show_checkout_coupon: false,
                show_checkout_payment: false,
                show_checkout_card: false,
                messages: messages
              }

              that.triggerEvent('notification', data);
            }
          }
        }
      });
    }
  }
})