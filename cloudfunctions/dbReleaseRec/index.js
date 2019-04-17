// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database();
// 云函数入口函数
exports.main = async(event, context) => {
  const wxContext = cloud.getWXContext()
  try {
    return await
    db.collection('tb_rec').add({
      // data 字段表示需新增的 JSON 数据
      data: {
        rec_college: event.dataInput.rec_college,
        rec_major: event.dataInput.rec_major,
        rec_grade: parseInt(event.dataInput.rec_grade),
        rec_semester: event.dataInput.rec_semester,
        rec_course: event.dataInput.rec_course,
        rec_teacher: event.dataInput.rec_teacher,
        rec_book_name: event.dataInput.rec_book_name,
        rec_book_isbn: parseInt(event.dataInput.rec_book_isbn),
        rec_book_writer: event.dataInput.rec_book_writer,
        rec_book_version: event.dataInput.rec_book_version,
        rec_book_publisher: event.dataInput.rec_book_publisher,
        rec_book_price: parseInt(event.dataInput.rec_book_price),
        rec_remark: event.dataInput.rec_remark,
        rec_create_date: Date.parse(new Date()),
        rec_stu_id: event.stu_id,
        rec_opinion: "",
        //状态：0不可见，1初始，10为通过，11为不通过
        rec_status: 1,
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
}