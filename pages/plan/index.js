
var app = getApp();

Page({
  data: {
    id: 44,
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
    insurances: [], 
    insurance_objs: [], 
    pickups: ["取车", "送车"]
  },
  onLoad: function (options) {
    /* this.setData({
      id: decodeURIComponent(options.id)
    }); */

    this.loadData();
  },
  loadData: function () {
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

          let distance_obj = {
            is_default: distance.default,
            mileage: distance.mileage,
            price: distance.price
          }

          distance_objs[index] = distance_obj;
          distances.push(distance.mileage + "英里");
        }

        //insurance
        var insurances = new Array();
        var insurance_objs = new Array();

        insurance_objs[0] = {price: "0"};
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
      }
    });
  },
  bindPickerPayment: function (e) {
    let payment = this.data.payment_objs[e.detail.value];

    this.setData({
      down_payment: payment.down_payment,
      monthly_payment: payment.monthly_payment,
      selected_payment_index: e.detail.value
    });
  },
  bindPickerDistance: function (e) {
    this.setData({
      selected_distance_index: e.detail.value
    });
  },
  bindPickerInsurance: function (e) {
    let insurance_obj = this.data.insurance_objs[e.detail.value];
    let price = insurance_obj["price"];

    this.setData({
      monthly_insurance: parseInt(price),
      selected_insurance_index: e.detail.value
    });
  },
  bindPickerPickup: function (e) {
    this.setData({
      selected_pickup_index: e.detail.value
    });
  }
})