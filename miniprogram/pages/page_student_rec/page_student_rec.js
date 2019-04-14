// miniprogram/pages/page_student_rec/page_student_rec.js
const db = wx.cloud.database()
import Dialog from '../../miniprogram_npm/vant-weapp/dialog/dialog';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    stu_id:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("推荐申请填写页面",options);
    this.setData({
      stu_id: parseInt(options._id)
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
   * 确定发布
   */
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value);
    let dataInput = e.detail.value;
    db.collection('tb_rec').add({
      // data 字段表示需新增的 JSON 数据
      data: {
        rec_college: dataInput.rec_college,
        rec_major: dataInput.rec_major,
        rec_grade: parseInt(dataInput.rec_grade),
        rec_semester: dataInput.rec_semester,
        rec_course: dataInput.rec_course,
        rec_teacher: dataInput.rec_teacher,
        rec_book_name: dataInput.rec_book_name,
        rec_book_isbn: parseInt(dataInput.rec_book_isbn),
        rec_book_writer: dataInput.rec_book_writer,
        rec_book_version: dataInput.rec_book_version,
        rec_book_publisher: dataInput.rec_book_publisher,
        rec_book_price: parseInt(dataInput.rec_book_price),
        rec_remark: dataInput.rec_remark,
        rec_create_date: (new Date()).toLocaleString(),
        rec_stu_id: this.data.stu_id,
        rec_opinion: "",
        //状态：0不可见，1初始，10为通过，11为不通过
        rec_status: 1,
      },
      success(res) {
        // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
        console.log("已创建申请",res);
        Dialog.confirm({
          title: '成功',
          message: '已成功申请，是否返回上一页'
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