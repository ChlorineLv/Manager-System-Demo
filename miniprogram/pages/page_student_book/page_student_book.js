// miniprogram/pages/page_student_book/page_stu_book.js
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order_detail: [],
    orderDetailCreateDate:'',
    activeNamesBookDetail: ['1', "2"],
    checkedBook: false,
    checkedBookSec: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log("学生教材预订登记页面", options._id);
    db.collection("tb_order").where({
      order_visible: true,
      _id: options._id
    }).get({
      success: res => {
        this.setData({
          order_id: options._id,
          order_detail: res.data[0],
          orderDetailCreateDate: res.data[0].order_create_date.toLocaleString()
        });
        console.log(this.data.order_detail);
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
   * 登记Collapse
   */
  onChangeCollapseBookDetail(event) {
    this.setData({
      activeNamesBookDetail: event.detail
    });
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
})