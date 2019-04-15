// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  try{
    return await db.collection("tb_rec").doc(event.recID).update({
      data:{
        rec_status: event.radioRecCheck,
        rec_opinion: event.radioCheckOpinion
      },
      success:res=>{
        console.log("dbCheckRec db.collection('tb_rec') res:", res);
        // return {
        //   event,
        //   openid: wxContext.OPENID,
        //   appid: wxContext.APPID,
        //   unionid: wxContext.UNIONID,
        // }
      },
      fail:err=>{
        console.log("dbCheckRec db.collection('tb_rec') err:",err);
      }
    })
    
  } catch(e){
    console.log("dbCheckRec function e:",e)
  }
}