
Component({
  properties: {
    message: {
      type: Array,
      value: ''
    }
  },
  data: {
    title: "微信登录",
    background_color: "#1aad19"
  },
  lifetimes: {
    attached: function () {}
  },
  methods: {
    start_loading: function () { 
      this.setData({
        title: "登录中 ...",
        background_color: "#1cc21b"
      });
    },
    stop_loading: function () {
      this.setData({
        title: "微信登录",
        background_color: "#1aad19"
      });
    }
  }
})