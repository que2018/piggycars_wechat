
let app = getApp();
let util = require('../../utils/util.js');

Component({
  properties: {
    message: {
      type: Array,
      value: ''
    }
  },
  data: {
    code: "",
    phone: "",
    phone_display: "",
    phone_local: "",
    country_code: "+1",
    country_codes: ["+1", "+86"],
    seconds: 60,
    show_edit: false,
    show_reset: false,
    disable_send: false,
    btn_sms_loading: false,
    btn_sms_disabled: false
  },
  lifetimes: {
    attached: function () {
      this.alert = this.selectComponent("#alert");

      if (app.globalData.phone) {
        this.setData({
          phone_display: app.globalData.phone,
          country_code: "+" + app.globalData.country_code,
          phone: app.globalData.phone_local,
          show_edit: false,
          show_reset: true
        });
      } else {
        this.setData({
          show_edit: true,
          show_reset: false
        });
      }
    }
  },
  methods: {
    sendMessage: function (e) {
      let that = this;

      that.setData({
        phone: e.detail.value.phone,
        btn_sms_loading: true
      });

      var phone = "";

      if (that.data.country_code == "+1") {
        phone = "1" + e.detail.value.phone;
      } else {
        phone = "86" + e.detail.value.phone;
      }

      wx.request({
        header: {
          'cookie': wx.getStorageSync("sessionid"),
          "Content-Type": "application/x-www-form-urlencoded"
        },
        url: app.globalData.API_SMS,
        method: "POST",
        data: util.json2Form({
          type: "sms",
          register: "1",
          phone: phone
        }),
        complete: function (res) {
          wx.hideKeyboard();

          that.setData({
            disable_send: true,
            btn_sms_loading: false,
            btn_sms_disabled: true
          });

          //console.log(res.data);

          if (!res.data.success) {
            var messages = [];

            if (res.data.code == "error_send_sms_failed") {
              let message = res.data.msg;
              messages.push(message);
              that.alert.show(messages);
            }

            if (res.data.code == "error_operation_too_frequent") {
              let message = "操作太频繁，请稍后再试";
              messages.push(message);
              that.alert.show(messages);
            }
          } 

          that.countdown();
        }
      });
    },
    bindCountryCodeChange: function (e) {
      let country_code = this.data.country_codes[e.detail.value];

      this.setData({
        country_code: country_code
      });

      app.globalData.country_code = country_code.replace("+", "");
    },
    bindPhoneLocal: function (e) {
      app.globalData.phone_local = e.detail.value;
    },
    bindCode: function (e) {
      let code = e.detail.value;

      this.setData({
        code: code
      });

      if (code.length == 6) {
        wx.hideKeyboard();
      }
    },
    bindStatic: function (e) {
      this.setData({
        show_edit: false
      });
    },
    bindEdit: function (e) {
      this.setData({
        show_edit: true
      });
    },
    bindNext: function (event) {
      app.globalData.code = this.data.code;

      let data = {
        show_checkout_sms: false,
        show_checkout_address: true,
        show_checkout_id: false,
        show_checkout_plan: false,
        show_checkout_coupon: false,
        show_checkout_payment: false,
        show_checkout_card: false
      }

      this.triggerEvent('notification', data);
    },
    countdown: function () {
      let that = this;
      let seconds = this.data.seconds;

      if (seconds == 0) {
        that.setData({
          seconds: 60,
          disable_send: false,
          btn_sms_disabled: false
        });

        return;
      }

      let time = setTimeout(function () {
        that.setData({
          seconds: seconds - 1
        });

        that.countdown();
      } , 1000);
    }
  }
})