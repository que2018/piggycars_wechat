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
            app.globalData.auth_login = true;
            app.globalData.token = res.data.token;
            app.globalData.token_id = res.data.token_id;
            app.globalData.name = res.data.name;
            app.globalData.course_ids = res.data.course_ids;
            app.globalData.exam_enabled = res.data.exam_enabled;
          } else {
            app.globalData.auth_login = false;
            app.globalData.token = "";
            app.globalData.token_id = 0;
            app.globalData.name = "";
            app.globalData.course_ids = [];
            app.globalData.exam_enabled = [];
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

/** 
 * 时间戳转化为年 月 日 时 分 秒 
 * number: 传入时间戳 
 * format：返回格式，支持自定义，但参数必须与formateArr里保持一致 
*/
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

/**
 * 检测当前的小程序
 * 是否是最新版本，是否需要下载、更新
 */
function checkUpdateVersion() {
  var app = getApp();
  if (wx.canIUse('getUpdateManager')) {
    const updateManager = wx.getUpdateManager();
    updateManager.onCheckForUpdate(function (res) {
      if (res.hasUpdate) {
        updateManager.onUpdateReady(function () {
          //TODO 新的版本已经下载好，调用 applyUpdate 应用新版本并重启 （ 此处进行了自动更新操作）
          //updateManager.applyUpdate();
          wx.showModal({
            title: '发现新版本',
            content: '使用新版本？',
            showCancel: true,//是否显示取消按钮
            cancelText: "否",//默认是“取消”
            confirmText: "是",//默认是“确定”
            success: function (res) {
              if (res.cancel) {
                //点击取消,默认隐藏弹框
              } else {
                //点击确定
                updateManager.applyUpdate();
              }
            },
            fail: function (res) { },//接口调用失败的回调函数
            complete: function (res) { },//接口调用结束的回调函数（调用成功、失败都会执行）
          })
        })
        updateManager.onUpdateFailed(function () {
          // 新版本下载失败
          wx.showModal({
            title: '发现新版本',
            content: '请您删除当前小程序，到微信 “发现-小程序” 页，重新搜索打开',
          })
        })
      }
    })
  } else {
    // wx.showModal({
    //   title: '溫馨提示',
    //   content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
    // })
  }
}

module.exports = {
  formatTime: formatTime,
  formatTimeWithFormat: formatTimeWithFormat,
  json2Form: json2Form,
  check_wechat_bg: check_wechat_bg,
  checkUpdateVersion: checkUpdateVersion
}

