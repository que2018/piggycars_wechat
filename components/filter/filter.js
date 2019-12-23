
var app = getApp();
var util = require('../../utils/util.js');

Component({
  properties: {
    message: {
      type: Array,
      value: ''
    }
  },
  data: {
    show_filter: false
  },
  lifetimes: {
    attached: function () {
  
    }
  },
  methods: {
    toggleFilter: function (event) {

      //console.log("bind tap ... ");

      this.animate('#xxxx', [
        { opacity: 1.0, rotate: 0, backgroundColor: '#FF0000' },
        { opacity: 0.5, rotate: 45, backgroundColor: '#00FF00' },
        { opacity: 1.0, rotate: 90, backgroundColor: '#FF0000' },
      ], 5000)

      this.setData({
        show_filter: true
      });
    },
  }
})