
Component({
  properties: {
    message: {
      type: Array,
      value: ''
    }
  },
  data: {
    show: false,
    size: 0,
    messages: []
  },
  lifetimes: {
    attached: function () {
  
    },
    moved: function () { },
    detached: function () { }
  },
  methods: {
    show: function (messages) { 
      var that = this;

      this.setData({
        show: true,
        length: messages.length,
        messages: messages
      });

      setTimeout(function () { 
        that.setData({
          show: false
        });
      }, 3000);
    }
  }
})