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
        order_college: event.inputCollege,
        order_major: event.inputMajor,
        order_grade: parseInt(event.inputGrade),
        order_semester: event.inputSemester,
        order_course: event.inputCourse,
        order_teacher: event.inputTeacher,
        order_book_name: event.inputBookName,
        order_book_isbn: parseInt(event.inputBookISBN),
        order_book_writer: event.inputBookWriter,
        order_book_version: event.inputBookVersion,
        order_book_publisher: event.inputBookPublisher,
        order_book_price: parseInt(event.inputBookPrice),
        order_book_num_sec: 0,
        order_book_num_first: 0,
        order_visible: true,
        order_remark: event.inputRemark
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
  // return event;
}