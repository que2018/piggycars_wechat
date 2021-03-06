
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

function json2Form(json) {
  var str = [];
  for (var p in json) {
    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(json[p]));
  }
  return str.join("&");
}

function formatTimeWithFormat(number, format) {
  var formateArr = ['Y', 'M', 'D', 'h', 'm', 's'];
  var returnArr = [];

  var date = new Date(number * 1000);
  returnArr.push(date.getFullYear());
  returnArr.push(formatNumber(date.getMonth() + 1));
  returnArr.push(formatNumber(date.getDate()));

  returnArr.push(formatNumber(date.getHours()));
  returnArr.push(formatNumber(date.getMinutes()));
  returnArr.push(formatNumber(date.getSeconds()));

  for (var i in returnArr) {
    format = format.replace(formateArr[i], returnArr[i]);
  }
  return format;
}

const wxPromisify = fn => {
  return function (obj = {}) {
    return new Promise((resolve, reject) => {
      obj.success = function (res) {
        resolve(res)
      }

      obj.fail = function (res) {
        reject(res)
      }

      fn(obj)
    })
  }
}

function wechatBgLogin() {
  var done = true;
  var app = getApp();
  
  wx.login({
    success: function (res) {
      wx.request({
        url: app.globalData.API_WECHAT_LOGIN,
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "POST",
        data: this.json2Form({
          api: "2",
          type: "wechat",
          param: res.code
        }),
        complete: function (res_login) {
          if (res_login.data.success) {
            app.globalData.is_login = true;
            wx.setStorageSync("sessionid", res_login.header["Set-Cookie"]);
          }
        }
      });  
    }
  });
}

module.exports = {
  formatTime: formatTime,
  formatTimeWithFormat: formatTimeWithFormat,
  json2Form: json2Form,
  wechatBgLogin: wechatBgLogin,
  wxPromisify: wxPromisify
}

