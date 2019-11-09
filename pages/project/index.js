
var app = getApp();

Page({
  data: {
    cars: "",
    show_loading: true
  },
  onLoad: function (options) {
    this.loadData();
  },
  loadData: function () {
    var that = this;

    wx.request({
      url: app.globalData.API_CARS,
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
            car.image = app.globalData.API_RES + "/lg/" + images[0].value;

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
  clickProject: function (event) {
    var project_id = event.currentTarget.dataset.project_id

    wx.navigateTo({
      url: '../project_detail/index?project_id=' + project_id
    });
  },
  clickApply: function (event) {
    if (app.globalData.is_login) {
      var project_id = event.currentTarget.dataset.project_id

      wx.navigateTo({
        url: '../apply/index?project_id=' + project_id
      });
    } else {
      wx.switchTab({
        url: '../me/index'
      });
    }
  },
  onPullDownRefresh: function () {
    this.loadData();  
  }
})