
Page({
  data: {
    id: "",
    year: "",
    make: "",
    model: "",
    city: "",
    mileage: "",
    vehicle_image: "",
    qr_image: "",
    down_payment: "",
    monthly_payment: "",
    selected_payment_index: "",
    selected_distance_index: "",
    selected_insurance_index: "",
    show_loading: false
  },
  onLoad: function (options) {
    this.setData({
      id: decodeURIComponent(options.id),
      year: decodeURIComponent(options.year),
      make: decodeURIComponent(options.make),
      model: decodeURIComponent(options.model),
      city: decodeURIComponent(options.city),
      mileage: decodeURIComponent(options.mileage),
      vehicle_image: decodeURIComponent(options.vehicle_image),
      down_payment: decodeURIComponent(options.down_payment),
      monthly_payment: decodeURIComponent(options.monthly_payment),
      selected_payment_index: decodeURIComponent(options.selected_payment_index),
      selected_distance_index: decodeURIComponent(options.selected_distance_index),
      selected_insurance_index: decodeURIComponent(options.selected_insurance_index)
    });

    wx.cloud.init({});

    let that = this;

    var path = "miniprogram/pages/car_detail/index?id=" + this.data.id;
    path += "&selected_payment_index=" + this.data.selected_payment_index;
    path += "&selected_distance_index=" + this.data.selected_distance_index;
    path += "&selected_insurance_index=" + this.data.selected_insurance_index;

    console.log(path);

    wx.cloud.callFunction({
      name: 'wecode',
      data: {
        path: path
      },
      success: function(res) {
        console.log(res.result);

        console.log("data:image/jpeg;base64," + wx.arrayBufferToBase64(res.result.buffer));

        that.setData({
          qr_image: "data:image/jpeg;base64," + wx.arrayBufferToBase64(res.result.buffer)
        });

      },
      fail: console.error
    });
  }
});