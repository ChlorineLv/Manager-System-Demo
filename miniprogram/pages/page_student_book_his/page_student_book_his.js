// miniprogram/pages/page_student_book_his/page_stu_book_his.js
import Dialog from '../../miniprogram_npm/vant-weapp/dialog/dialog';
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    his_detail: [],
    hisUpdateDate: "",
    checkedBook: false,
    checkedBookSec: false,
    id_His:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log("学生教材预订历史详情页面", options);
    this.setData({
      id_His: options._id
    });
    db.collection("tb_his").doc(options._id).get({
      success: res => {
        // console.log("tb_his",res);
        this.setData({
          his_detail: res.data,
          checkedBook: res.data.his_first,
          checkedBookSec: res.data.his_sec & res.data.his_first,
          hisUpdateDate: res.data.his_update_date.toLocaleString(),
        })
      },
      fail: err => {
        console.log(err);
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  /**
   * 点击左边返回
   */
  onClickLeft() {
    wx.navigateBack({
      delta: 1
    })
  },

  /**
   * 点击右边注销
   */
  onClickRight() {
    wx.navigateBack({
      delta: 2
    })
  },

  /**
   * 手动侦听“预订”选项改变状态
   */
  onChangeSwitchBook(event) {
    this.setData({
      checkedBook: event.detail
    });
  },

  /**
   * 手动侦听“二手书”选项改变状态
   */
  onChangeSwitchBookSec(event) {
    this.setData({
      checkedBookSec: event.detail
    });
  },

  /**
   * 点击登记提交按钮
   */
  btn_submit() {
    // console.log("订书：", this.data.checkedBook, "，二手：", this.data.checkedBookSec);
    // console.log("提交", this.data);
    db.collection("tb_his").doc(this.data.id_His).update({
      data: {
        his_first: this.data.checkedBook,
        his_sec: this.data.checkedBookSec,
        his_update_date: (new Date()).toLocaleString()
      },
      success: res => {
        Dialog.confirm({
          title: '成功',
          message: '已成功更新，是否返回上一页'
        }).then(() => {
          // on confirm
          wx.navigateBack({
            delta: 1
          })
        }).catch(() => {
          // on cancel
        });
      },
      fail: err => {
        console.error(err);
      }
    })
  }
})