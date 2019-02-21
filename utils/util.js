const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const check_wechat_bg = done => {
  var done = true;
  var app = getApp();

  wx.login({
    success: function (res) {
      wx.request({
        url: app.globalData.API_CHECK_WECHAT_BG + "?code=" + res.code,
        complete: function (res) {
          if (res.data.is_login) {
            app.globalData.AUTH_LOGIN = true;
            app.globalData.TOKEN = res.data.token;
            app.globalData.token_id = res.data.token_id;
            app.globalData.name = res.data.name;
            app.globalData.course_ids = res.data.course_ids;
            app.globalData.exam_enabled = res.data.exam_enabled;
          } else {
            app.globalData.AUTH_LOGIN = false;
          }
        }
      })
    }
  });

  return done;
}

function json2Form(json) {
  var str = [];
  for (var p in json) {
    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(json[p]));
  }
  return str.join("&");
}

module.exports = {
  formatTime: formatTime,
  json2Form: json2Form,
  check_wechat_bg: check_wechat_bg
}
