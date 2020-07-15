
var app = getApp();

Component({
  properties: {
    second: {
      type: Number,
      observer(newVal) {
        cal(newVal, this);
      }
    },
  },

  data: {
    clock: ''
  },

  methods: {
  },

  attached: function () {
    cal(this);
  }
})
function cal(that) {
  var current_timestamp = Date.parse(new Date());
  var finish_timestamp = app.globalData.exam_finish_timestamp;

  var second = (finish_timestamp - current_timestamp) / 1000;

  that.setData({
    clock: date_format(second)
  });

  if(second <= 0) {
    that.setData({
      clock: "-- -- --"
    });

    return;
  }

  setTimeout(function () {
    cal(that);
  }, 1000)
}

function fill_zero_prefix(num) {
  return num < 10 ? "0" + num : num
}

function date_format(second) {
  var hr = Math.floor(second / 3600);
  var min = fill_zero_prefix(Math.floor((second - hr * 3600) / 60));
  var sec = fill_zero_prefix((second - hr * 3600 - min * 60));
  return hr + ":" + min + ":" + sec;
}