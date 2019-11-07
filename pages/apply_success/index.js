
Page({
  data: {
    project_id: 0,
    amount: 0,
    order_id: 0
  },
  onLoad: function (options) {
    this.setData({
      project_id: decodeURIComponent(options.project_id),
      amount: decodeURIComponent(options.amount) ,
      order_id: decodeURIComponent(options.order_id) 
    })
  },
  clickReturn: function (event) {
    if (project_id != 0){
      wx.redirectTo({
        url: '../project_detail/index?project_id=' + this.data.project_id
      });
    }else{
      wx.switchTab({
        url: '../me/index'
      });
    }
  },
  
  clickOrderDetail: function (event) {
    wx.redirectTo({
      url: '../order_detail/index?order_id=' + this.data.order_id
    });
  }
})