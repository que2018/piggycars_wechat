
var app = getApp();

Page({
  data: {
    show_checkout_sms: true,
    show_checkout_address: false,
    show_checkout_id: false,
    show_checkout_plan: false,
    show_checkout_coupon: false,
    show_checkout_payment: false,
    show_checkout_card: false
  },
  onLoad: function (options) {

  },
  checkoutNotification: function (e) {

    console.log(e.detail);

    this.setData({
      show_checkout_sms: e.detail.show_checkout_sms,
      show_checkout_address: e.detail.show_checkout_address,
      show_checkout_id: e.detail.show_checkout_id,
      show_checkout_plan: e.detail.show_checkout_plan,
      show_checkout_coupon: e.detail.show_checkout_coupon,
      show_checkout_payment: e.detail.show_checkout_payment,
      show_checkout_card: e.detail.show_checkout_card
    });
  }
})