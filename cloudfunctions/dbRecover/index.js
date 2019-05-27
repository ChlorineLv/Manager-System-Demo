// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database();
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();
  var data = {};
  if (event.dbName == "tb_order") {
    data['order_visible'] = true
  };
  if (event.dbName == "tb_rec") {
    data['rec_visible'] = true
  };
  if (event.dbName == "tb_sec") {
    data['sec_visible'] = true
  };
  if (event.dbName == "tb_user") {
    data['user_visible'] = true
  }

  return db.collection(event.dbName).doc(event._id).update({
    data: data
  }).then(res => {
    res.appid = wxContext.APPID;
    res.openid = wxContext.OPENID;
    res.unionid = wxContext.UNIONID;
    res.event = event;
    return res
  })

}