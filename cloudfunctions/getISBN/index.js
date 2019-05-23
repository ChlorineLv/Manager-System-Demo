// 云函数入口文件
const cloud = require('wx-server-sdk')
var rq = require("request-promise");
cloud.init()

// 云函数入口函数
exports.main = async(event, context) => {
  const wxContext = cloud.getWXContext()
  var res = rq('http://119.29.3.47:9001/book/worm/isbn?isbn='+ event.isbn).then(html => {
    return html
  }).catch(err => {
    console.log(err);
  });
  return res;
}