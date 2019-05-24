// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database();
// 云函数入口函数
exports.main = async(event, context) => {
  const wxContext = cloud.getWXContext()

  return db.collection("tb_user").add({
    data: {
      user_college: event.inputCollege,
      user_id: parseInt(event.inputID),
      user_major: event.inputMajor,
      user_pwd: event.inputPwd,
      user_grade: parseInt(event.inputGrade),
      user_visible:true,
    },
    success: resAdd => {
      return resAdd;
    }
  })
}