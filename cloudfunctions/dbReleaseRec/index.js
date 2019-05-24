// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database();
// 云函数入口函数
exports.main = async(event, context) => {
  const wxContext = cloud.getWXContext();

  try {
    return await
    db.collection('tb_rec').add({
      // data 字段表示需新增的 JSON 数据
      data: {
        rec_create_date: Date.parse(new Date()),
        rec_stu_id: event.stu_id,
        rec_opinion: "",
        rec_college: event.inputCollege,
        rec_major: event.inputMajor,
        rec_grade: parseInt(event.inputGrade),
        rec_semester: event.inputSemester,
        rec_course: event.inputCourse,
        rec_teacher: event.inputTeacher,
        rec_book_name: event.inputBookName,
        rec_book_isbn: parseInt(event.inputBookISBN),
        rec_book_writer: event.inputBookWriter,
        rec_book_version: event.inputBookVersion,
        rec_book_publisher: event.inputBookPublisher,
        rec_book_price: parseInt(event.inputBookPrice),
        // rec_remark: event.inputRemark,
        //状态：0不可见，1初始，10为通过，11为不通过
        rec_status: 1,
        rec_visible: true,
      },
      success: res => {
        console.log("dbReleaseRec db.collection('tb_rec') res:", res);
      },
      fail: err => {
        console.log("dbReleaseRec db.collection('tb_rec') err:", err);
      }
    })
    // return{
    //   event,
    // }
  } catch (e) {
    console.log("dbReleaseRec function e", e);
  }
  // return event;
}