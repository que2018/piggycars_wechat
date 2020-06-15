
let app = getApp();
let util = require('../../utils/util.js');

Page({
  data: {
    cars: [],
    pointer: 0,
    is_end: false,
    is_loading: false,
    show_loading: true,
    show_no_car: false
  },
  onLoad: function (options) {
    this.refreshData();
  },
  onReady: function () {
    this.filter = this.selectComponent("#filter");
  },
  refreshData: function () {
    let that = this;

    that.setData({
      show_loading: true
    });

    let header = {
      "Content-Type": "application/x-www-form-urlencoded"
    };

    var data = app.globalData.filter_params;
    data["start"] = 0;
    data["size"] = app.globalData.limit;
    data["sft"] = "wechat";

    wx.request({
      url: app.globalData.API_CARS,
      header: header,
      method: "POST",
      data: util.json2Form(data),
      complete: function (res) {
        if (res.data.success) {
          var cars = [];

          //console.log(res.data);

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
            car.leased = item.leased;

            var images = [];

            for (var index in item.car_images) {
              images.push(app.globalData.API_RES + "/car/sm/" + item.car_images[index].value);
            }

            for (var index in item.vehicle_images) {
              images.push(app.globalData.API_RES + "/vehicle/sm/" + item.vehicle_images[index].value);
            }

            car.images = images;

            cars.push(car);
          }

          if(cars.length > 0) {
            that.setData({
              cars: cars,
              pointer: app.globalData.limit,
              show_loading: false
            });
          } else {
            that.setData({
              cars: cars,
              show_no_car: true,
              show_loading: false
            });
          }
        }

        wx.hideNavigationBarLoading();
        wx.stopPullDownRefresh();
      }
    });
  },
  loadData: function () {
    if (!this.data.is_end) {
      let that = this;

      let header = {
        "Content-Type": "application/x-www-form-urlencoded"
      };

      var data = app.globalData.filter_params;
      data["start"] = this.data.pointer;
      data["size"] = app.globalData.limit;
      data["sft"] = "wechat";

      //console.log(data);

      wx.request({
        url: app.globalData.API_CARS,
        header: header,
        method: "POST",
        data: util.json2Form(data),
        complete: function (res) {
          if (res.data.success) {
            var cars = that.data.cars;

            //console.log(res.data);

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

              var images = [];

              for (var index in item.car_images) {
                images.push(app.globalData.API_RES + "/car/sm/" + item.car_images[index].value);
              }

              for (var index in item.vehicle_images) {
                images.push(app.globalData.API_RES + "/vehicle/sm/" + item.vehicle_images[index].value);
              }

              car.images = images;

              cars.push(car);
            }

            if (cars.length < app.globalData.limit) {
              that.setData({
                cars: cars,
                is_end: true,
                is_loading: false,
                pointer: (that.data.pointer + app.globalData.limit),
              });
            } else {
              that.setData({
                cars: cars,
                is_loading: false,
                pointer: (that.data.pointer + app.globalData.limit),
              });
            }
          }

          wx.hideNavigationBarLoading();
          wx.stopPullDownRefresh();
        }
      });
    }
  },
  filterNotification: function (event) {
    this.refreshData();
  },
  scrollToBottom: function (event) {
    this.loadData();
  },
  goToDetail: function (event) {
    var id = event.currentTarget.dataset.id;

    wx.navigateTo({
      url: '../car_detail/index?id=' + id
    });
  },
  onPullDownRefresh: function () {
    let params = {start: 0, size: 100};
    app.globalData.filter_params = util.json2Form(params);

    this.refreshData();  
  },
  onShareAppMessage: function (res) {
    return {
      title: '汽车订阅服务&随心换车',
      path: '/pages/home/index',
      imageUrl: "../../images/banner1.jpg",
      success: function (res) {

      },
      fail: function (res) {

      }
    }
  }
})