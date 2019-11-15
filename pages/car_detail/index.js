
var app = getApp();

Page({
  data: {
    id: "",
    make: "",
    model: "",
    mileage: "",
    color: "",
    price: "",
    year: "",
    style: "",
    vin: "",
    city: "",
    transmission: "",
    engine: "",
    drivetrain: "",
    exterior_color: "",
    interior_color: "",
    car_features: [],
    car_images: [],
    show_loading: true
  },
  onLoad: function (options) {
    this.setData({
      id: decodeURIComponent(options.id)
    });

    this.loadData();
  },
  loadData: function () {
    var that = this;

    wx.request({
      url: app.globalData.API_CAR + "?id=" + this.data.id,
      complete: function (res) {
        console.log(res);

        var car_images = [];

        for(var index in res.data.data.car_images) {
          car_images.push(app.globalData.API_RES + "/lg/" + res.data.data.car_images[index]);
        }

        that.setData({
          make: res.data.data.make,
          model: res.data.data.model,
          year: res.data.data.year,
          color: res.data.data.color,
          price: res.data.data.price,
          mileage: res.data.data.mileage,
          style: res.data.data.style,
          vin: res.data.data.vin,
          city: res.data.data.location.city,
          transmission: res.data.data.transmission,
          car_features: res.data.data.car_features,
          passenger: res.data.data.passenger,
          engine: res.data.data.engine,
          drivetrain: res.data.data.drivetrain,
          exterior_color: res.data.data.exterior_color,
          interior_color: res.data.data.interior_color,
          car_images: car_images
        });
      }
    });
  }
})