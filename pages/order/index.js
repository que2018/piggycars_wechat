
let app = getApp();
let util = require('../../utils/util.js');

Page({
  data: {
    orders: [],
    show_loading: true
  },
  onLoad: function (options) {
    this.loadData();
  },
  loadData: function () {
    var that = this;

    let header = {
      "cookie": wx.getStorageSync("sessionid"),
      "Content-Type": "application/x-www-form-urlencoded"
    };

    let data = {start: 0, size: 100};

    wx.request({
      url: app.globalData.API_ORDER,
      header: header,
      method: "POST",
      data: data,
      complete: function (res) {
        that.setData({
          show_loading: false
        });

        console.log(res.data);

        if (res.data.success) {
          var orders = [];

          for (var i = 0; i < res.data.data.items.length; i++) {
            var order = new Object();
            let item = res.data.data.items[i];

            order.id = item.id;
            order.carId = item.carId;
            order.name = item.car_model;
            order.year = item.year;
            order.make = decodeURIComponent(item.make);
            order.model = decodeURIComponent(item.model);
            order.image = app.globalData.API_RES + "/car/orig/" + item.car_image;
            order.date_added = decodeURIComponent(item.date_added);
            order.location = item.location;
            order.mileage = item.mileage;
            order.price = item.price;
            order.order_status = item.order_status;
            order.lease_months = item.lease_months;
            order.payment_down = item.payment_down;
            order.payment_down_tax = item.payment_down_tax;
            order.payment_down_total = item.payment_down_total;
            order.payment_monthly = item.payment_monthly;
            order.payment_monthly_tax = item.payment_monthly_tax;
            order.payment_monthly_total = item.payment_monthly_total;
 
            orders.push(order);
          }

          that.setData({
            orders: orders
          });
        }

        wx.hideNavigationBarLoading();
        wx.stopPullDownRefresh();
      }
    });
  },
  bindOrderDetail: function (event) {
    console.log(event.currentTarget.dataset);

    let index = event.currentTarget.dataset.index;
    app.globalData.order = this.data.orders[index];

    wx.navigateTo({
      url: '../order_detail/index'
    });
  },
  onPullDownRefresh: function () {
    this.loadData();
  }
})