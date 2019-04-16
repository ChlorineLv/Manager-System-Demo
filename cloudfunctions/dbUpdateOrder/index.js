// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database();
// 云函数入口函数
exports.main = async(event, context) => {
  const wxContext = cloud.getWXContext()
  try {
    return await
    db.collection("tb_order").doc(event.order_id).update({
      data: {
        order_timeout: event.checked,
        order_book_num_first: parseInt(event.numBookFirst),
        order_book_num_sec: parseInt(event.numBookSec),
        order_college: event.order_detail.order_college,
        order_major: event.order_detail.order_major,
        order_grade: parseInt(event.order_detail.order_grade),
        order_semester: event.order_detail.order_semester,
        order_course: event.order_detail.order_course,
        order_teacher: event.order_detail.order_teacher,
        order_book_name: event.order_detail.order_book_name,
        order_book_isbn: parseInt(event.order_detail.order_book_isbn),
        order_writer: event.order_detail.order_writer,
        order_version: parseInt(event.order_detail.order_version),
        order_publisher: event.order_detail.order_publisher,
        order_price: parseInt(event.order_detail.order_price),
        order_remark: event.order_detail.order_remark,
        order_update_date: Date.parse(new Date())
      },
      success: res => {
        console.log("dbUpdateOrder db.collection('tb_order') res:", res);
      },
      fail: err => {
        console.error("dbUpdateOrder db.collection('tb_order') err:", err);
      }
    })
  } catch (e) {
    console.error("dbUpdateOrder function e:", e);
  }

}