Page({
  data: {
    balance:0,
    project_id:0
  },

  onLoad: function (options) {
    this.setData({
      balance: decodeURIComponent(options.balance),
      project_id: decodeURIComponent(options.project_id)
    })
  },

  clickRecharge: function(event) {
    wx.redirectTo({
      url: '../charge_option/index?project_id=' + this.data.project_id
    });
  },
})