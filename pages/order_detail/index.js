
var app = getApp();
var util = require('../../utils/util.js');

Page({
  data: {
    order_id: "",
    base_url: app.globalData.BASE_URL,
    info: "",
    pj_info: "",
    re_time_list: "",
    list_total: 0,
    show_loading: true
  },
  onLoad: function (options) {
    this.setData({
      order_id: decodeURIComponent(options.order_id)
    });

    this.loadData();
  },
  loadData: function () {
    var that = this;

    wx.request({
      url: app.globalData.API_ORDER_DETIAL + this.data.order_id,
      complete: function (res) {
        var info = res.data.data.info;
        res.data.data.info.create_time = util.formatTimeWithFormat(info.create_time, 'Y-M-D h:m:s'); 
        res.data.data.info.next_time = util.formatTimeWithFormat(info.next_time, 'Y-M-D'); 
        res.data.data.info.last_interest = info.last_interest.toFixed(2);
        res.data.data.info.interest = info.interest.toFixed(2);

        var re_time_list = res.data.data.re_time_list;
        var total = 0;
        for (var i = 0; i < re_time_list.length; i++) {
          total += parseFloat(re_time_list[i].re_money.toFixed(2));
          res.data.data.re_time_list[i].re_money = re_time_list[i].re_money.toFixed(2);
          res.data.data.re_time_list[i].next_time = util.formatTimeWithFormat(re_time_list[i].next_time, 'Y-M-D');
        }

        that.setData({
          show_loading: false,
          info: res.data.data.info,
          pj_info: res.data.data.pj_info,
          re_time_list: res.data.data.re_time_list,
          list_total: total.toFixed(2)
        });

        wx.hideNavigationBarLoading();
        wx.stopPullDownRefresh();
      }
    });
  }
})