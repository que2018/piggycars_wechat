
var app = getApp();
var util = require('../../utils/util.js');

Component({
  properties: {
    message: {
      type: Array,
      value: ""
    }
  },
  data: {
    show_filter: false,
    keys: ["cities", "colors", "dealers", "down_payment", "makes", "mileage", "monthly_payment", "styles", "years"]
  },
  lifetimes: {
    attached: function () {
      var that = this;

      wx.request({
        url: app.globalData.API_FILTERS,
        complete: function (res) {
          console.log(res);

          if(res.data.success) {
            let filterItems = res.data.data;

            that.setData({
              filter_items: filterItems
            });

            for (const key of that.data.keys) {
              console.log(filterItems[key]);
            }

          }
        }
      });
    }
  },
  methods: {
    toggleFilter: function (event) {
      /* this.animate('#xxxx', [
        { opacity: 1.0, rotate: 0, backgroundColor: '#FF0000' },
        { opacity: 0.5, rotate: 45, backgroundColor: '#00FF00' },
        { opacity: 1.0, rotate: 90, backgroundColor: '#FF0000' },
      ], 5000); */

      if(this.data.show_filter) {
        this.setData({
          show_filter: false
        });
      } else {
        this.setData({
          show_filter: true
        });
      }
    }
  }
})