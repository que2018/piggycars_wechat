
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
    country: "US",
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

          if (res.data.success) 
          {
            let data = {
              show_checkout_sms: false,
              show_checkout_address: false,
              show_checkout_id: true,
              show_checkout_plan: false,
              show_checkout_coupon: false,
              show_checkout_payment: false,
              show_checkout_card: false
            }

            that.triggerEvent('notification', data);
          } 
          else 
          {  
            if (res.data.code == "error_form_error") 
            {
              if (res.data.form_error["code[sms]"]) 
              {
                var messages = [];
                let message = "输入的短信代码有误哦";
                messages.push(message);

                let data = {
                  show_checkout_sms: true,
                  show_checkout_address: false,
                  show_checkout_id: false,
                  show_checkout_plan: false,
                  show_checkout_coupon: false,
                  show_checkout_payment: false,
                  show_checkout_card: false,
                  messages: messages
                }

                //recover global phone setting
                app.globalData.code = "";

                let phone = app.globalData.phone;

                if (phone.charAt(0) == "1") {
                  app.globalData.country_code = "1";
                  app.globalData.phone_local = phone.substring(1, phone.length);

                } else {
                  app.globalData.country_code = "86";
                  app.globalData.phone_local = phone.substring(2, phone.length);
                }

                //trigger parent
                that.triggerEvent('notification', data);
              }
              else
              {
                var messages = [];

                if (res.data.form_error["address_1"]) {
                  let message = "输入的地址有误";
                  messages.push(message);
                }

                if (res.data.form_error["city"]) {
                  let message = "输入的城市有误";
                  messages.push(message);
                }

                if (res.data.form_error["zone"]) {
                  let message = "输入的州有误";
                  messages.push(message);
                }

                if (res.data.form_error["postcode"]) {
                  let message = "输入的邮编有误";
                  messages.push(message);
                }

                if (res.data.form_error["country"]) {
                  let message = "输入的国家有误";
                  messages.push(message);
                }

                let data = {
                  show_checkout_sms: false,
                  show_checkout_address: true,
                  show_checkout_id: false,
                  show_checkout_plan: false,
                  show_checkout_coupon: false,
                  show_checkout_payment: false,
                  show_checkout_card: false,
                  messages: messages
                }

                //trigger parent
                that.triggerEvent('notification', data);
              }
            }
          }
        }
      });
    }
  }
})