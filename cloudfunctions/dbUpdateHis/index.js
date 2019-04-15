// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database();
// 云函数入口函数
exports.main = async(event, context) => {
  const wxContext = cloud.getWXContext()
  try {
    return await 
    db.collection("tb_his").doc(event.id_His).update({
      data: {
        his_first: event.checkedBook,
        his_sec: event.checkedBookSec,
        his_update_date: Date.parse(new Date())
      },
      success: res => {
        console.log("dbUpdateHis db.collection('tb_his') res:", res);
      },
      fail: err => {
        console.error("dbUpdateHis db.collection('tb_his') err:", err);
      }
    })
  } catch (e) {
    console.error("dbUpdateHis function e:", e);
  }
}