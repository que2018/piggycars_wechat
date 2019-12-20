
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
    card_number: "",
    card_number_disp: "",
    exp_month: "",
    exp_year: "",
    cvv: "",
    exp_months: [],
    exp_years: [],
    btn_loading: false
  },
  lifetimes: {
    attached: function () {
      let exp_months = ["01","02","03","04","05","06","07","08","09","10","11","12"];
      let exp_years = ["20", "21", "22", "23"];

      this.setData({
        exp_months: exp_months,
        exp_years: exp_years
      });
    }
  },
  methods: {
    bindPickerMonth: function (e) {
      let exp_month = this.data.exp_months[e.detail.value];

      this.setData({
        exp_month: exp_month
      });
    },
    bindPickerYear: function (e) {
      let exp_year = this.data.exp_years[e.detail.value];

      this.setData({
        exp_year: exp_year
      });
    },
    bindCardNumber: function (e) {
      var card_number = e.detail.value;
      var card_number_disp = "";
      let length = card_number.length;

      if (length <= 4) {
        card_number_disp = card_number;
      } else if ((4 < length) && (length <= 8)) {
        card_number_disp = card_number.substring(0, 4) + " " 
                         + card_number.substring(4, length);
      } else if ((8 < length) && (length <= 12)) {
        card_number_disp = card_number.substring(0, 4) + " " 
                         + card_number.substring(4, 8) + " " 
                         + card_number.substring(8, length);
      } else if ((12 < length) && (length <= 16)) {
        card_number_disp = card_number.substring(0, 4) + " "
                         + card_number.substring(4, 8) + " "
                         + card_number.substring(8, 12) + " "
                         + card_number.substring(12, 16);
      } else {
        card_number_disp = card_number.substring(0, 4) + " " 
                         + card_number.substring(4, 8) + " " 
                         + card_number.substring(8, 12) + " " 
                         + card_number.substring(12, 16);
      }

      this.setData({
        card_number: card_number,
        card_number_disp: card_number_disp
      })
    },
    bindCVV: function (e) {
      this.setData({
        cvv: e.detail.value
      })
    },
    sendPayment: function (e) {
      var that = this;

      that.setData({
        btn_loading: true
      });

      wx.request({
        header: {
          'cookie': wx.getStorageSync("sessionid"),
          "Content-Type": "application/x-www-form-urlencoded"
        },
        url: app.globalData.API_CARD,
        method: "POST",
        data: util.json2Form({
          cc_number: that.data.card_number,
          cc_expire_date_month: that.data.exp_month,
          cc_expire_date_year: that.data.exp_year,
          cc_cvv2: that.data.cvv
        }),
        complete: function (res) {
          that.setData({
            btn_loading: false
          });

          console.log(res.data);

          if (res.data.success) {
            wx.navigateTo({
              url: '../checkout_success/index?order_id=' + app.globalData.order_id
            });
          } else {
            let data = {messages: ""}

            if (res.data.code == "error_payment_unknown") {
              data.messages = "未知支付错误";
            }

            that.triggerEvent('notification', data);
          }
        }
      });
    }
  }
})