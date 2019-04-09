// miniprogram/pages/page_student_book_his/page_stu_book_his.js
const db= wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    his_detail:[],
    hisUpdateDate: "",
    checkedBook: false,
    checkedBookSec: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("学生教材预订历史详情页面", options);
    db.collection("tb_his").doc(options._id).get({
      success:res=>{
        // console.log("tb_his",res);
        this.setData({
          his_detail: res.data,
          checkedBook: res.data.his_first,
          checkedBookSec: res.data.his_sec & res.data.his_first,
          hisUpdateDate: res.data.his_update_date.toLocaleString(),
        })
      },
      fail:err=>{
        console.log(err);
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})