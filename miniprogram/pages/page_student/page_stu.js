// miniprogram/pages/page_student/page_stu.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    stu_id: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log("学生页面");
    this.setData({
      stu_id: parseInt(options._id)
    });
    console.log(this.data.stu_id);
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
   * 点击右边注销
   */
  onClickRight() {
    wx.navigateBack({
      delta: 1
    })
  },

  /**
   * 点击教材预订登记
   */
  btn_booking() {
    wx.navigateTo({
      url: '../page_student_book_his/page_stu_book_his?_id=' + stu_id,
    })
  },

  /**
   * 点击教材预订历史
   */
  btn_booking_mgmt() {
    wx.navigateTo({
      url: '',
    })
  },


})