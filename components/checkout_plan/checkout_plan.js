
var app = getApp();
var util = require('../../utils/util.js');

Component({
  properties: {},
  data: {
    id: "",
    down_payment: 0,
    monthly_payment: 0,
    monthly_insurance: 0,
    selected_payment_index: 0,
    selected_distance_index: 0,
    selected_insurance_index: 0,
    selected_pickup_index: 0,
    payments: [],
    payment_objs: [],
    distances: [],
    distance_objs: [],
    insurances: [],
    insurance_objs: [],
    pickups: ["取车", "送车"],
    btn_loading: false,
    order_id: 0
  },
  lifetimes: {
    attached: function () {
      this.setData({
        id: app.globalData.checkout_id
      });

      this.alert = this.selectComponent("#alert");

      var that = this;

      wx.request({
        url: app.globalData.API_CAR + "?id=" + that.data.id,
        complete: function (res) {
          console.log(res);

          //payments
          var default_payment = {};
          var payments = new Array();
          var payment_objs = new Array();

          for (var index in res.data.data.payments) {
            let payment = res.data.data.payments[index];

            if (payment.default) {
              that.setData({
                selected_payment_index: index,
                down_payment: payment.down_payment,
                monthly_payment: payment.monthly_payment
              });
            }

            let payment_obj = {
              months: payment.months,
              down_payment: payment.down_payment,
              down_payment_tax: payment.down_payment_tax,
              monthly_payment: payment.monthly_payment,
              monthly_payment_tax: payment.monthly_payment_tax
            }

            payment_objs[index] = payment_obj;
            payments.push(payment.months + "个月");
          }

          //distances
          var distances = new Array();
          var distance_objs = new Array();

          for (var index in res.data.data.distances) {
            let distance = res.data.data.distances[index];

            if (distance.default) {
              that.setData({
                selected_distance_index: index
              });
            }

            let distance_obj = {
              is_default: distance.default,
              mileage: distance.mileage,
              price: distance.price
            }

            distance_objs[index] = distance_obj;

            if (distance.mileage == 0) {
              distances.push("不限里程");
            } else {
              distances.push(distance.mileage + "英里");
            }
          }

          //insurance
          var insurances = new Array();
          var insurance_objs = new Array();

          insurance_objs[0] = { price: "0" };
          insurances.push("自己的保险");

          for (var index in res.data.data.insurances) {
            let insurance = res.data.data.insurances[index];

            let insurance_obj = {
              price: insurance.price
            }

            insurance_objs[parseInt(index) + 1] = insurance_obj;
            insurances.push("$" + insurance.price + "/月");
          }

          that.setData({
            payments: payments,
            payment_objs: payment_objs,
            distances: distances,
            distance_objs: distance_objs,
            insurances: insurances,
            insurance_objs: insurance_objs
          });

          //set default monthly payment
          let payment_obj = that.data.payment_objs[that.data.selected_payment_index];
          let distance_obj = that.data.distance_objs[that.data.selected_distance_index];
          let insurance_obj = that.data.insurance_objs[that.data.selected_insurance_index];

          let monthly_payment = parseInt(payment_obj.monthly_payment) + parseInt(distance_obj.price) + parseInt(insurance_obj.price);;

          that.setData({
            monthly_payment: monthly_payment,
            down_payment: payment_obj.down_payment
          });

        }
      });
    }
  },
  methods: {
    bindPickerPayment: function (e) {
      let payment_obj = this.data.payment_objs[e.detail.value];
      let distance_obj = this.data.distance_objs[this.data.selected_distance_index];
      let insurance_obj = this.data.insurance_objs[this.data.selected_insurance_index];

      let monthly_payment = parseInt(payment_obj.monthly_payment) + parseInt(distance_obj.price) + parseInt(insurance_obj.price);

      this.setData({
        monthly_payment: monthly_payment,
        down_payment: payment_obj.down_payment,
        selected_payment_index: e.detail.value
      });
    },
    bindPickerDistance: function (e) {
      let payment_obj = this.data.payment_objs[this.data.selected_payment_index];
      let distance_obj = this.data.distance_objs[e.detail.value];
      let insurance_obj = this.data.insurance_objs[this.data.selected_insurance_index];

      let monthly_payment = parseInt(payment_obj.monthly_payment) + parseInt(distance_obj.price) + parseInt(insurance_obj.price);

      this.setData({
        monthly_payment: monthly_payment,
        selected_distance_index: e.detail.value
      });
    },
    bindPickerInsurance: function (e) {
      let payment_obj = this.data.payment_objs[this.data.selected_payment_index];
      let distance_obj = this.data.distance_objs[this.data.selected_distance_index];
      let insurance_obj = this.data.insurance_objs[e.detail.value];

      let monthly_payment = parseInt(payment_obj.monthly_payment) + parseInt(distance_obj.price) + parseInt(insurance_obj.price);

      this.setData({
        monthly_payment: monthly_payment,
        selected_insurance_index: e.detail.value
      });
    },
    bindPickerPickup: function (e) {
      this.setData({
        selected_pickup_index: e.detail.value
      });
    },
    bindPlan: function (e) {
      var that = this;

      that.setData({
        btn_loading: true
      });

      let checkout_months = that.data.payment_objs[that.data.selected_payment_index].months;
      let checkout_distance = that.data.distance_objs[that.data.selected_distance_index].mileage;
      let checkout_insurance = that.data.selected_insurance_index;
      let checkout_pickup = that.data.selected_pickup_index;

      wx.request({
        url: app.globalData.API_CONFIRM,
        header: {
          'cookie': wx.getStorageSync("sessionid"),
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "POST",
        data: util.json2Form({
          id: that.data.id,
          checkout_months: checkout_months,
          checkout_distance: checkout_distance,
          checkout_insurance: checkout_insurance,
          checkout_pickup: checkout_pickup
        }),
        complete: function (res) {
          that.setData({
            btn_loading: false
          });

          if (res.data.success) {
            app.globalData.order_id = res.data.data.order_id;

            let payment_down = Number(res.data.data.order.payment_down);
            let payment_down_tax = Number(res.data.data.order.payment_down_tax);
            let payment_down_total = Number(res.data.data.order.payment_down_total);

            app.globalData.checkout_payment_down = payment_down.toFixed(2);
            app.globalData.checkout_payment_down_tax = payment_down_tax.toFixed(2);
            app.globalData.checkout_payment_down_total = payment_down_total.toFixed(2);

            let data = {
              show_checkout_sms: false,
              show_checkout_address: false,
              show_checkout_id: false,
              show_checkout_plan: false,
              show_checkout_coupon: false,
              show_checkout_payment: true,
              show_checkout_card: false
            }

            that.triggerEvent('notification', data);
          }
        }
      });
    }
  }
})