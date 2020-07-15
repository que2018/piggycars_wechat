const cloud = require('wx-server-sdk')

cloud.init()

exports.main = async (event, context) => {
  try {
    const result = await cloud.openapi.wxacode.get({
        path: event.path,
        width: 100
      })
    return result
  } catch (err) {
    return err
  }
}