
var app = getApp();
var util = require('../../utils/util.js');

Page({
  data: {
    cars: "",
    show_loading: true
  },
  onLoad: function (options) {
    this.loadData();
  },
  onReady: function () {
    this.filter = this.selectComponent("#filter");
  },
  loadData: function () {
    var that = this;

    that.setData({
      show_loading: true
    });

    let header = {
      "Content-Type": "application/x-www-form-urlencoded"
    };

    let data = app.globalData.filter_params;

    wx.request({
      url: app.globalData.API_CARS,
      header: header,
      method: "POST",
      data: util.json2Form(data),
      complete: function (res) {
        if (res.data.success) {
          var cars = [];

          for (var i = 0; i < res.data.data.items.length; i++) {
            var car = new Object();
            let item = res.data.data.items[i];

            car.id = item.id;
            car.carId = item.carId;
            car.year = item.year;
            car.make = decodeURIComponent(item.make);
            car.model = decodeURIComponent(item.model);
            car.mileage = item.mileage
            car.monthlyPayment = item.monthly_payment
            car.city = item.location.city

            let images = item.car_images;

            if (images[0]) {
              car.image = app.globalData.API_RES + "/car/lg/" + images[0].value;
            } else {
              car.image = "../../images/logo.png"
            }

            cars.push(car);
          }

          that.setData({
            show_loading: false,
            cars: cars
          });
        }

        wx.hideNavigationBarLoading();
        wx.stopPullDownRefresh();
      }
    });
  },
  filterNotification: function (event) {
    this.loadData();
  },
  bindCar: function (event) {
    var id = event.currentTarget.dataset.id;

    wx.navigateTo({
      url: '../car_detail/index?id=' + id
    });
  },
  onPullDownRefresh: function () {
    let params = {start: 0, size: 100};
    app.globalData.filter_params = util.json2Form(params);

    this.loadData();  
  }
})