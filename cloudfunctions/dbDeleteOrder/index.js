// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database();
// 云函数入口函数
exports.main = async(event, context) => {
  const wxContext = cloud.getWXContext();
  var data = [];
  if(event.dbName=="tb_order"){
    data['order_visible'] = false
  }

  return db.collection("tb_order").doc(event.order_id).update({
    data: {
      order_visible: false
    }
  }).then(res => {
    res.appid = wxContext.APPID;
    res.openid= wxContext.OPENID;
    res.unionid= wxContext.UNIONID;
    res.event=event;
    return res
  })

}