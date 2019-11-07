
var util = require('../../utils/util.js');
var app = getApp();

Page({
  data: {
    project_id: 0,//add by Neil for recharge notify, use for back to the project apply page
    method: "",
    loading: false,
    amount: ""
  },
  onLoad: function (options) {
    this.setData({
      project_id: decodeURIComponent(options.project_id)
    })
  },

  setOption: function (e) {
    var that = this;

    var method = e.detail.value.method;
    var amount = e.detail.value.amount * 100;

    if(method == "") {
      wx.showToast({
        title: "请选择支付方式",
        image: '/images/cry.png',
        duration: 2500,
        mask: true
      });
    }

    if (method == "card") {
      if (amount == "") {
        wx.showToast({
          title: "请输入金额",
          image: '/images/cry.png',
          duration: 2500,
          mask: true
        });
      }else{
        wx.navigateTo({
          url: '../charge_card/index?amount=' + amount + '&project_id=' + that.data.project_id
        });
        return;
      }
    }

    if(method == "wechat") {
      that.setData({
        loading: true
      });

      wx.login({
        success: function (res) {
          var code = res.code;

          wx.request({
            url: app.globalData.API_CHARGE_WECHAT,
            header: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            method: "POST",
            data: util.json2Form({
              code: code,
              user_id: app.globalData.user_id,
              amount: amount
            }),
            complete: function (res) {
              that.setData({
                loading: false
              });

              if(res.data.status == 1) {
                var nonceStr = res.data.data.nonceStr;
                var paySign = res.data.data.paySign;
                var signType = res.data.data.signType;
                var timeStamp = res.data.data.timeStamp;
                var wechatPackage = res.data.data.wechatPackage;

                wx.requestPayment({
                  'timeStamp': timeStamp,
                  'nonceStr': nonceStr,
                  'package': wechatPackage,
                  'signType': signType,
                  'paySign': paySign,
                  'success': function (res) { 
                    wx.redirectTo({
                      url: '../charge_success/index?amount=' + amount + '&project_id=' + that.data.project_id
                    });
                  },
                  'fail': function (res) {
                    wx.navigateTo({
                      url: '../charge_fail/index'
                    });
                   },
                  'complete': function (res) {
                    that.setData({
                      loading: false
                    });
                   }
                });
              } else {
                that.setData({
                  amount: ""
                }); 

                wx.showToast({
                  title: res.data.info,
                  image: '/images/cry.png',
                  duration: 2500,
                  mask: true
                });
              }
            }
          });
        }
      }); 
    }
  },
  selectMethod(e){
    var that = this;

    var method = e.detail.value;
    that.setData({
      method: method
    });
  },
  onPullDownRefresh: function () {

  }
})