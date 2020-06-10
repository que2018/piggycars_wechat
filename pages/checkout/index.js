
let app = getApp();

Page({
  data: {
    show_checkout_sms: true,
    show_checkout_address: false,
    show_checkout_id: false,
    show_checkout_plan: false,
    show_checkout_coupon: false,
    show_checkout_payment: false,
    show_checkout_card: false,
    messages: []
  },
  onLoad: function (options) {
    this.alert = this.selectComponent("#alert");
    this.wechat_button = this.selectComponent("#wechat_button");

    this.setData({
      show_checkout_sms: true,
      show_checkout_address: false,
      show_checkout_id: false,
      show_checkout_plan: false,
      show_checkout_coupon: false,
      show_checkout_payment: false,
      show_checkout_card: false,
      messages: []
    });
  },
  checkoutNotification: function (e) {
    //console.log(e.detail);

    if (typeof e.detail.show_checkout_sms !== 'undefined') {
      this.setData({
        show_checkout_sms: e.detail.show_checkout_sms
      });
    }

    if (typeof e.detail.show_checkout_address !== 'undefined') {
      this.setData({
        show_checkout_address: e.detail.show_checkout_address
      });
    }

    if (e.detail.show_checkout_id !== 'undefined') {
      this.setData({
        show_checkout_id: e.detail.show_checkout_id
      });
    }

    if (typeof e.detail.show_checkout_plan !== 'undefined') {
      this.setData({
        show_checkout_plan: e.detail.show_checkout_plan
      });
    }

    if (typeof e.detail.show_checkout_coupon !== 'undefined') {
      this.setData({
        show_checkout_coupon: e.detail.show_checkout_coupon
      });
    }

    if (typeof e.detail.show_checkout_payment !== 'undefined') {
      this.setData({
        show_checkout_payment: e.detail.show_checkout_payment
      });
    }

    if (typeof e.detail.show_checkout_card !== 'undefined') {
      this.setData({
        show_checkout_card: e.detail.show_checkout_card
      });
    }

    /*
    if (typeof e.detail.messages !== 'undefined') {
      this.setData({
        messages: e.detail.messages
      });
    }

    if ((typeof this.data.messages !== 'undefined') && (this.data.messages.length > 0)){
      this.alert.show(this.data.messages);
    }
    */

    if (typeof e.detail.messages !== 'undefined') {
      this.alert.show(e.detail.messages);
    }
  }
})