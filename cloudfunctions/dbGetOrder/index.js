// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()
// 云函数入口函数
exports.main = async(event, context) => {
  const wxContext = cloud.getWXContext();
  var order_new_detail=[]

  try {
    
    db.collection("tb_order").doc(event.order_id).get({
      success:res=>{
        console.log("dbGetOrder db.collection('tb_order').get res:", res);
      },
      fail: err=>{
        console.log("dbGetOrder db.collection('tb_order').get err:", err);
      }
    })

    // db.collection("tb_order").doc(options._id).get({
    //   success: res => {
    //     order_id = options._id;
    //     order_detail = res.data;
    //     orderDetailCreateDate = (new Date(res.data.order_create_date)).toLocaleString();
    //     orderDetailUpdateDate = (new Date(res.data.order_update_date)).toLocaleString();
    //     if (res.data.order_timeout == true) {
    //       check = true
    //     };
    //     // console.log("tb_order detail", this.data.order_detail);
    //     // 查询需要订书的表项
    //     db.collection("tb_his").where({
    //       his_grade: order_detail.order_grade,
    //       his_book_isbn: order_detail.order_book_isbn,
    //       his_college: order_detail.order_college,
    //       his_major: order_detail.order_major,
    //       his_first: true,
    //     }).get({
    //       success: resHis => {
    //         console.log("tb_his", resHis.data);
    //         var countFirst = 0;
    //         var countSec = 0;
    //         for (let i = 0; i < resHis.data.length; i++) {
    //           if (resHis.data[i].his_sec) {
    //             countSec++;
    //           } else {
    //             countFirst++;
    //           }
    //         }
    //         numBookFirst = countFirst;
    //         numBookSec = countSec;
    //         // console.log("numBookFirst:", this.data.numBookFirst, ",numBookSec:", this.data.numBookSec);
    //       },
    //       fail: err => {
    //         console.error(err);
    //       }
    //     })
    //   },
    //   fail: err => {
    //     console.error(err);
    //   }
    // });
    return {
      event,
      openid: wxContext.OPENID,
      appid: wxContext.APPID,
      unionid: wxContext.UNIONID,
      check: check,
      order_id: order_id,
      order_detail: order_detail,
      orderDetailCreateDate: orderDetailCreateDate,
      orderDetailUpdateDate: orderDetailUpdateDate,
      numBookFirst: numBookFirst,
      numBookSec: numBookSec,
    }
  } catch (e) {
    console.log("dbGetOrder function e:", e);
  }
  // return {
  //   event,
  //   openid: wxContext.OPENID,
  //   appid: wxContext.APPID,
  //   unionid: wxContext.UNIONID,
  // }
}