// miniprogram/pages/page_admin_book/page_admin_book.js
const db = wx.cloud.database()
import Dialog from '../../miniprogram_npm/vant-weapp/dialog/dialog';
Page({

  /**
   * 页面的初始数据
   */
  data: {
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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
    wx.redirectTo({
      url: '../index/index'
    })
  },


  /**
   * 确定发布
   */
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value);
    let dataInput = e.detail.value;
    db.collection('tb_order').add({
      // data 字段表示需新增的 JSON 数据
      data: {
        order_create_date: new Date(),
        order_college: dataInput.order_college,
        order_major: dataInput.order_major,
        order_grade: dataInput.order_grade,
        order_semester: dataInput.order_semester,
        order_course: dataInput.order_course,
        order_teacher: dataInput.order_teacher,
        order_book_name: dataInput.order_book_name,
        order_book_isbn: dataInput.order_book_isbn,
        order_book_writer: dataInput.order_book_writer,
        order_book_version: dataInput.order_book_version,
        order_book_publisher: dataInput.order_book_publisher,
        order_book_price: dataInput.order_book_price,
        order_book_type: dataInput.order_book_type,
        order_book_num: 0,
        order_remark: dataInput.order_remark
      },
      success(res) {
        // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
        console.log(res);
        // wx.showToast({
        //   title: '已成功发布',
        //   duration:2000,
        //   icon:'none'
        // });
        Dialog.confirm({
          title: '成功',
          message: '已成功发布，是否返回上一页'
        }).then(() => {
          // on confirm
          wx.navigateBack({
            delta:1
          })
        }).catch(() => {
          // on cancel
        });
      }
    })
  }
})