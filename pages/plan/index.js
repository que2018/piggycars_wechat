
var app = getApp();

Page({
  data: {
    id: 44,
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
            default_payment = payment;
          }

          let payment_obj = {
            down_payment: payment.down_payment,
            down_payment_tax: payment.down_payment_tax,
            monthly_payment: payment.monthly_payment,
            monthly_payment_tax: payment.monthly_payment_tax
          }

          payment_objs[payment.months] = payment_obj;
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

        that.setData({
          payments: payments,
          payment_objs: payment_objs,
          distances: distances,
          distance_objs: distance_objs
        });
      }
    });
  }
})