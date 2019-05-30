// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  return db.collection("tb_user").doc(event.id).update({
    data: {
      user_face:event.faceToken
    }
  }).then(res=>{
    return {
      res,
      event,
    }
  })
}