// miniprogram/pages/page_student_sec/page_student_sec.js
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
    console.log("二手教材回收申请填写页面", options);
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
    wx.cloud.callFunction({
      // 云函数名称
      name: 'dbReleaseSec',
      // 传给云函数的参数
      data: {
        dataInput: dataInput,
        stu_id: this.data.stu_id
      },
      success(res) {
        console.log("callFunction dbReleaseSec result:", res.result)
        if (res.result != null) {
          Dialog.confirm({
            title: '成功',
            message: '已成功登记，单号为' + res.result._id + '，是否返回上一页'
          }).then(() => {
            // on confirm
            wx.navigateBack({
              delta: 1
            })
          }).catch(() => {
            // on cancel
          });
        } else {
          Dialog.confirm({
            title: '异常',
            message: '异常信息：' + res
          }).then(() => {
            // on confirm
          }).catch(() => {
            // on cancel
          });
        }
      },
      fail: err => {
        console.error("callFunction dbReleaseSec err:", err)
      }
    });
  }  
})