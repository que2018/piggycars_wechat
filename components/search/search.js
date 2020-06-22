
let app = getApp();
let util = require('../../utils/util.js');

Component({
  properties: {},
  data: {
    cars: [],
    keyword: "",
    show: false,
    focus: false
  },
  lifetimes: {
    attached: function () {}
  },
  methods: {
    search: function (keyword) {
      let that = this;

      that.setData({
        show_loading: true
      });

      let header = {
        "Content-Type": "application/x-www-form-urlencoded"
      };

      var data = {};
      data["start"] = 0;
      data["size"] = app.globalData.limit;
      data["search"] = keyword;

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
              car.trim = decodeURIComponent(item.trim);
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

            if (cars.length > 0) {
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
    goToDetail: function (event) {
      var id = event.currentTarget.dataset.id;

      wx.navigateTo({
        url: '../car_detail/index?id=' + id
      });
    },
    bindkeyword: function (e) {
      let keyword = e.detail.value;
      this.search(keyword);
    },
    show: function () {
      this.setData({
        cars: [],
        show: true,
        keyword: "",
        focus: true
      });
    },
    hide: function () {
      this.setData({
        show: false
      });
    },
    clear: function () {
      this.setData({
        cars: []
      });
    },
    setFocus: function () {
      this.setData({
        focus: true
      });
    },
  }
})