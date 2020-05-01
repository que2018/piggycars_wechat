
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
    lat: "",
    lng: "",
    transmission: "",
    engine: "",
    drivetrain: "",
    exterior_color: "",
    interior_color: "",
    car_features: [],
    car_images: [],
    show_loading: true,
    markers: [],
    payments: [],
    payment_months: [],
    payment_index: 0,
    default_payment: {},
    down_payment: 0,
    monthly_payment: 0,
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
        //console.log(res);

        var car_images = [];

        for(var index in res.data.data.car_images) {
          car_images.push(app.globalData.API_RES + "/car/lg/" + res.data.data.car_images[index]);
        }

        for (var index in res.data.data.vehicle_images) {
          car_images.push(app.globalData.API_RES + "/vehicle/lg/" + res.data.data.vehicle_images[index]);
        }

        var payment_index = 0;
        var default_payment = {};
        var payments = new Array();
        var payment_months = new Array();

        for(var index in res.data.data.payments) {
          let payment = res.data.data.payments[index];

          if(payment.default) {
            payment_index = index;
            default_payment = payment;
          }

          let payment_obj = {
            down_payment: payment.down_payment,
            down_payment_tax: payment.down_payment_tax,
            monthly_payment: payment.monthly_payment,
            monthly_payment_tax: payment.monthly_payment_tax
          }

          payments[index] = payment_obj;
          payment_months.push(payment.months + "个月");
        }

        that.setData({
          id: res.data.data.id,
          make: res.data.data.make,
          model: res.data.data.model,
          year: res.data.data.year,
          color: res.data.data.color,
          price: res.data.data.price,
          mileage: res.data.data.mileage,
          style: res.data.data.style,
          vin: res.data.data.vin,
          city: res.data.data.location.city,
          lat: res.data.data.location.lat,
          lng: res.data.data.location.lng,
          car_features: res.data.data.car_features,
          transmission: (res.data.data.transmission) ? res.data.data.transmission : "--",
          passenger: (res.data.data.passenger) ? res.data.data.passenger:"--",
          engine: (res.data.data.engine) ? res.data.data.engine : "--",
          drivetrain: (res.data.data.drivetrain) ? res.data.data.drivetrain : "--",
          exterior_color: (res.data.data.exterior_color) ? res.data.data.exterior_color : "--",
          interior_color: (res.data.data.interior_color) ? res.data.data.interior_color : "--",
          payments: payments,
          payment_index: payment_index,
          payment_months: payment_months,
          down_payment: default_payment.down_payment,
          monthly_payment: default_payment.monthly_payment,
          car_images: car_images,
          markers: [{
            iconPath: "../../images/map.png",
            id: 0,
            latitude: res.data.data.location.lat,
            longitude: res.data.data.location.lng,
            width: 30,
            height: 30
          }]
        });
      }
    });
  },
  bindPickerChange: function (e) {
    let payment = this.data.payments[e.detail.value];
    
    this.setData({
      payment_index: e.detail.value,
      down_payment: payment.down_payment,
      monthly_payment: payment.monthly_payment
    });
  },
  bindReserve: function (e) {
    if(app.globalData.is_login) {
      app.globalData.checkout_id = this.data.id;
      app.globalData.checkout_year = this.data.year;
      app.globalData.checkout_make = this.data.make;
      app.globalData.checkout_model = this.data.model;
      app.globalData.checkout_image = this.data.car_images[0];

      app.globalData.checkout_id = this.data.id;
      
      wx.navigateTo({
        url: '../checkout/index'
      });
      
    } else {
      wx.switchTab({
        url: '../me/index'
      });
    }
  }
})