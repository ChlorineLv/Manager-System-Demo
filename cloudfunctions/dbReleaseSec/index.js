// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database();
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  try {
    return await
      db.collection('tb_sec').add({
        // data 字段表示需新增的 JSON 数据
        data: {
          sec_phone: parseInt(event.dataInput.sec_phone),
          sec_add: event.dataInput.sec_add,
          sec_college: event.dataInput.sec_college,
          sec_major: event.dataInput.sec_major,
          sec_grade: parseInt(event.dataInput.sec_grade),
          sec_semester: event.dataInput.sec_semester,
          sec_course: event.dataInput.sec_course,
          sec_teacher: event.dataInput.sec_teacher,
          sec_book_name: event.dataInput.sec_book_name,
          sec_book_isbn: parseInt(event.dataInput.sec_book_isbn),
          sec_book_writer: event.dataInput.sec_book_writer,
          sec_book_version: event.dataInput.sec_book_version,
          sec_book_publisher: event.dataInput.sec_book_publisher,
          sec_book_price: parseInt(event.dataInput.sec_book_price),
          sec_remark: event.dataInput.sec_remark,
          sec_create_date: Date.parse(new Date()),
          sec_stu_id: event.stu_id,
          sec_opinion: "",
          //状态：0不可见，1初始，10为通过，11为不通过
          sec_status: 1,
        },
        success: res => {
          console.log("dbReleaseSec db.collection('tb_sec') res:", res);
        },
        fail: err => {
          console.log("dbReleaseSec db.collection('tb_sec') err:", err);
        }
      })
    // return{
    //   event,
    // }
  } catch (e) {
    console.log("dbReleaseSec function e", e);
  }
}