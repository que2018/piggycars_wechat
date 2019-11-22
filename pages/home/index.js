
var app = getApp();

Page({
  data: {
    sliders: []
  },
  onLoad: function (options) {
    this.loadData();
  },
  loadData: function () {
    var that = this;

    var sliders = [];
    let slider1 = "https://piggycars.com/assets/image/slider1.jpg";
    let slider2 = "https://piggycars.com/assets/image/slider2.jpg";

    sliders.push(slider1);
    sliders.push(slider2);

    that.setData({
      sliders: sliders
    });
  },
  clickSlider: function (event) {
    
  }
})
