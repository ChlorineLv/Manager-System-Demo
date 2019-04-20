// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database();
// 云函数入口函数
exports.main = async(event, context) => {
  const wxContext = cloud.getWXContext()
  try {
    return await
      db.collection('tb_his').add({
        // data 字段表示需新增的 JSON 数据
        data: {
          his_order_id: event.order_detail._id,
          his_update_date: Date.parse(new Date()),
          his_stu_id: parseInt(event.user_detail.user_id),
          his_college: event.order_detail.order_college,
          his_major: event.order_detail.order_major,
          his_grade: parseInt(event.user_detail.user_grade),
          his_semester: event.order_detail.order_semester,
          his_course: event.order_detail.order_course,
          his_teacher: event.order_detail.order_teacher,
          his_book_name: event.order_detail.order_book_name,
          his_book_isbn: parseInt(event.order_detail.order_book_isbn),
          his_book_writer: event.order_detail.order_book_writer,
          his_book_version: event.order_detail.order_book_version,
          his_book_publisher: event.order_detail.order_book_publisher,
          his_book_price: event.order_detail.order_book_price,
          his_first: event.checkedBook,
          his_sec: event.checkedBookSec,
        },
        success: resAdd => {
          console.log("dbReleaseHis db.collection('tb_his') res:", res);
        },
        fail: err => {
          console.log("dbReleaseHis db.collection('tb_his') err:", err);
        }
      })
  } catch (e) {
    console.log("dbReleaseHis function e:", e)
  }
  return {
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}