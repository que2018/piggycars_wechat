
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
    id_process: 0,
    id_country: "cn",
    cn_dl_photo_front: "",
    cn_id_photo_front: "",
    us_dl_photo_front: "",
    us_dl_photo_back: "",
    messages: []
  },
  onLoad: function (options) {
    this.alert = this.selectComponent("#alert");

    this.setData({
      show_checkout_sms: true,
      show_checkout_address: false,
      show_checkout_id: false,
      show_checkout_plan: false,
      show_checkout_coupon: false,
      show_checkout_payment: false,
      show_checkout_card: false,
      id_process: 0,
      id_country: "cn",
      cn_dl_photo_front: "",
      cn_id_photo_front: "",
      us_dl_photo_front: "",
      us_dl_photo_back: "",
      messages: []
    });
  },
  onShow: function () {
    console.log("checkout on show .... ");
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

    if (typeof e.detail.show_checkout_id !== 'undefined') {
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

    if (typeof e.detail.id_country !== 'undefined') {

      console.log("country changed ...");

      this.setData({
        id_country: e.detail.id_country
      });
    }

    if (typeof e.detail.messages !== 'undefined') {
      this.alert.show(e.detail.messages);
    }
  }
})