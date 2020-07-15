
let util = require('util.js');

function wechatBgLogin() {
  var app = getApp();
  
  wx.login({
    success: function (res) {
      wx.request({
        url: app.globalData.API_WECHAT_LOGIN,
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "POST",
        data: util.json2Form({
          api: "2",
          type: "wechat",
          param: res.code
        }),
        complete: function (res_login) {

          console.log(res_login);

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
  wechatBgLogin: wechatBgLogin,
}

