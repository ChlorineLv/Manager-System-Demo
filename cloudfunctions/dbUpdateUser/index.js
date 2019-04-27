// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  return db.collection("tb_user").doc(event._id).update({
    data:{
      user_id:event.user_id,
      user_major: event.user_major,
      user_college: event.user_college,
      user_pwd: event.user_pwd,
      user_grade: event.user_grade
    },
      success: res => {
      console.log("dbUpdateUser db.collection('tb_user') res:", res);
    },
    fail: err => {
      console.error("dbUpdateUser db.collection('tb_user') err:", err);
    }
  })
}