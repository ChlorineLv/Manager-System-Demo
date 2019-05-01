// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database();
// 云函数入口函数
exports.main = async(event, context) => {
  const wxContext = cloud.getWXContext()
  try {
    return await
    db.collection('tb_sec').add({
      // data 字段表示需新增的 JSON 数据
      data: {
        sec_create_date: Date.parse(new Date()),
        sec_stu_id: event.stu_id,
        sec_phone: parseInt(event.inputPhone),
        sec_add: event.inputAdd,
        sec_college: event.inputCollege,
        sec_major: event.inputMajor,
        sec_grade: parseInt(event.inputGrade),
        sec_semester: event.inputSemester,
        sec_course: event.inputCourse,
        sec_teacher: event.inputTeacher,
        sec_book_name: event.inputBookName,
        sec_book_isbn: parseInt(event.inputBookISBN),
        sec_book_writer: event.inputBookWriter,
        sec_book_version: event.inputBookVersion,
        sec_book_publisher: event.inputBookPublisher,
        sec_book_price: parseInt(event.inputBookPrice),
        // sec_remark: event.inputRemark,
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