
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
    exp_month: "-",
    exp_year: "-",
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

      this.alert = this.selectComponent("#alert");
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
      this.setData({
        card_number: e.detail.value
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

          }
        }
      });
    }
  }
})