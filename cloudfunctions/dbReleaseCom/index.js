// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database();
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  try {
    return await
      db.collection('tb_com').add({
        // data 字段表示需新增的 JSON 数据
        data: {
          com_stu_id:parseInt(event.stu_id),
          com_rec_id:event.rec_id,
          com_comment:event.com_comment,
          com_create_date: Date.parse(new Date()),
        },
        success: resAdd => {
          console.log("dbReleaseCom db.collection('tb_com') res:", res);
        },
        fail: err => {
          console.log("dbReleaseCom db.collection('tb_com') err:", err);
        }
      })
  } catch (e) {
    console.log("dbReleaseCom function e:", e)
  }
  return {
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}