// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  try {
    return await db.collection("tb_sec").doc(event.secID).update({
      data: {
        sec_status: event.radioSecCheck,
        sec_opinion: event.secCheckOpinion,
        sec_check_date: Date.parse(new Date())
      },
      success: res => {
        console.log("dbCheckSec db.collection('tb_sec') res:", res);

      },
      fail: err => {
        console.log("dbCheckSec db.collection('tb_sec') err:", err);
      }
    })
  } catch (e) {
    console.log("dbCheckSec function e:", e)
  }
}