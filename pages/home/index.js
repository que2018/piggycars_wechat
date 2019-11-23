
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
    let slider1 = app.globalData.API_RES + "/slider1.jpg";
    let slider2 = app.globalData.API_RES + "/slider2.jpg";

    sliders.push(slider1);
    sliders.push(slider2);

    that.setData({
      sliders: sliders
    });
  },
  clickSlider: function (event) {
    
  }
})
