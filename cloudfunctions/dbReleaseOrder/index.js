// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database();
// 云函数入口函数
exports.main = async(event, context) => {
  const wxContext = cloud.getWXContext()
  try {
    return await
    db.collection('tb_order').add({
      // data 字段表示需新增的 JSON 数据
      data: {
        order_create_date: Date.parse(new Date()),
        order_timeout: false,
        order_college: event.order_college,
        order_major: event.order_major,
        order_grade: parseInt(event.order_grade),
        order_semester: event.order_semester,
        order_course: event.order_course,
        order_teacher: event.order_teacher,
        order_book_name: event.order_book_name,
        order_book_isbn: parseInt(event.order_book_isbn),
        order_book_writer: event.order_book_writer,
        order_book_version: event.order_book_version,
        order_book_publisher: event.order_book_publisher,
        order_book_price: parseInt(event.order_book_price),
        order_book_num_sec: 0,
        order_book_num_first: 0,
        order_visible: true,
        order_remark: event.order_remark
      },
      success: res => {
        console.log("dbReleaseOrder db.collection('tb_order') res:", res);
      },
      fail: err => {
        console.log("dbReleaseOrder db.collection('tb_order') err:", err);
      }
    })
  } catch (e) {
    console.log("dbReleaseOrder function e:", e);
  }
}