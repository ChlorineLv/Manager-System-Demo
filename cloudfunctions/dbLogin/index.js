// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database();
// 云函数入口函数
exports.main = async(event, context) => {
  const wxContext = cloud.getWXContext();
  const total = await db.collection("tb_user").where({
    user_id: parseInt(event.in_acc),
  }).count();
  var userCollege = "";
  var boolPassword = false;
  if (total.total != 0) {
    return db.collection("tb_user").where({
      user_id: parseInt(event.in_acc),
    }).get().then(res => {
      if (event.in_pwd == res.data[0].user_pwd) {
        boolPassword = true;
        userCollege = res.data[0].user_college;
      }
      return {
        boolPassword,
        userCollege,
      };
    })
  } else {
    return 0;
  }

}