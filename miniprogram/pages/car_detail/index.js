
let app = getApp();

Page({
  data: {
    id: "",
    make: "",
    model: "",
    trim: "",
    mileage: "",
    color: "",
    price: "",
    leased: false,
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
    main_image: "",
    car_images: [],
    show_loading: true,
    markers: [],
    down_payment: 0,
    monthly_payment: 0,
    monthly_insurance: 0,
    selected_payment_index: false,
    selected_distance_index: false,
    selected_insurance_index: false,
    payments: [],
    payment_objs: [],
    distances: [],
    distance_objs: [],
    insurances: [],
    insurance_objs: [],
    show_loading: true,
    drivetrain: ["前驱", "后驱", "四轮驱动", "全轮驱动"]
  },
  onLoad: function (options) {
    this.setData({
      id: decodeURIComponent(options.id),
      make: decodeURIComponent(options.make)
    });

    if(typeof options.selected_payment_index !== 'undefined') {
      this.setData({
        selected_payment_index: decodeURIComponent(options.selected_payment_index)
      });
    }

    if (typeof options.selected_distance_index !== 'undefined') {
      this.setData({
        selected_distance_index: decodeURIComponent(options.selected_distance_index)
      });
    }

    if (typeof options.selected_insurance_index !== 'undefined') {
      this.setData({
        selected_insurance_index: decodeURIComponent(options.selected_insurance_index)
      });
    }

    this.loadData();
  },
  loadData: function () {
    let that = this;

    wx.request({
      url: app.globalData.API_CAR + "?l=1&id=" + this.data.id,
      complete: function (res) {
        //console.log(res);

        var car_images = [];

        for(var index in res.data.data.car_images) {
          car_images.push(app.globalData.API_RES + "/car/lg/" + res.data.data.car_images[index]);
        }

        for (var index in res.data.data.vehicle_images) {
          car_images.push(app.globalData.API_RES + "/vehicle/lg/" + res.data.data.vehicle_images[index]);
        }
        
        let main_image = app.globalData.API_RES + "/vehicle/lg/" + res.data.data.vehicle_images[0];

        //payments
        var default_payment = {};
        var payments = new Array();
        var payment_objs = new Array();

        for (var index in res.data.data.payments) {
          let payment = res.data.data.payments[index];

          if (payment.default && (!that.data.selected_payment_index)) {
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

          if (distance.default && (!that.data.selected_distance_index)) {
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

        if (!that.data.selected_insurance_index) {
          that.setData({
            selected_insurance_index: 0
          });
        }

        for (var index in res.data.data.insurances) {
          let insurance = res.data.data.insurances[index];

          let insurance_obj = {
            price: insurance.price
          }

          insurance_objs[parseInt(index) + 1] = insurance_obj;
          insurances.push("$" + insurance.price + "/月");
        }
  
        that.setData({
          id: res.data.data.id,
          make: res.data.data.make,
          model: res.data.data.model,
          trim: res.data.data.trim,
          year: res.data.data.year,
          color: res.data.data.color,
          price: res.data.data.price,
          mileage: res.data.data.mileage,
          style: res.data.data.style,
          vin: res.data.data.vin,
          leased: res.data.data.leased,
          city: res.data.data.location.city,
          lat: res.data.data.location.lat,
          lng: res.data.data.location.lng,
          car_features: res.data.data.car_features,
          transmission: (res.data.data.transmission == 1) ? "自动挡" : "手动挡",
          passenger: (res.data.data.passenger) ? res.data.data.passenger:"--",
          engine: (res.data.data.engine) ? res.data.data.engine : "--",
          drivetrain: that.data.drivetrain[res.data.data.drivetrain],
          exterior_color: (res.data.data.exterior_color) ? res.data.data.exterior_color : "--",
          interior_color: (res.data.data.interior_color) ? res.data.data.interior_color : "--",
          main_image: main_image,
          car_images: car_images,
          markers: [{
            iconPath: "../../images/map.png",
            id: 0,
            latitude: res.data.data.location.lat,
            longitude: res.data.data.location.lng,
            width: 30,
            height: 30
          }],
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

        //hide loading
        that.setData({
          show_loading: false
        });
      }
    });
  },
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
        url: '../wechat/index'
      });
    }
  },
  bindBanner: function (e) {
    var url = "../car_banner/index";

    url += "?id=" + this.data.id;
    url += "&year=" + this.data.year;
    url += "&make=" + this.data.make;
    url += "&model=" + this.data.model;
    url += "&city=" + this.data.city;
    url += "&mileage=" + this.data.mileage;
    url += "&vehicle_image=" + this.data.car_images[0];
    url += "&down_payment=" + this.data.down_payment;
    url += "&monthly_payment=" + this.data.monthly_payment;
    url += "&selected_payment_index=" + this.data.selected_payment_index;
    url += "&selected_distance_index=" + this.data.selected_distance_index;
    url += "&selected_insurance_index=" + this.data.selected_insurance_index;

    wx.navigateTo({
      url: url
    });
  },
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      console.log(res.target)
    }

    var path = "/pages/car_detail/index?id=" + this.data.id;
    path += "&selected_payment_index=" + this.data.selected_payment_index;
    path += "&selected_distance_index=" + this.data.selected_distance_index;
    path += "&selected_insurance_index=" + this.data.selected_insurance_index;

    return {
      title: this.data.year + " " + this.data.make + " " + this.data.model,
      imageUrl: this.data.car_images[0],
      path: path, 
      success: function (res) {

      },
      fail: function (res) {

      }
    }
  }
})