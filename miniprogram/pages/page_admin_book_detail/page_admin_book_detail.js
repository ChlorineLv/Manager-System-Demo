// miniprogram/pages/page_admin_book_detail/page_admin_book_detail.js
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    checked: false,
    order_detail: [],
    order_id: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    db.collection("tb_order").doc(options._id).get({
      success: res => {
        this.setData({
          order_id: options._id,
          order_detail: res.data
        });
        if (res.data.order_timeout == true) {
          this.setData({
            checked: true
          });
        };
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
   * 手动侦听“逾期”选项改变状态
   */
  onChange(event) {
    // 需要手动对 checked 状态进行更新
    this.setData({
      checked: event.detail
    });
    db.collection("tb_order").doc(this.data.order_id).update({
      data: {
        order_timeout: this.data.checked
      },
      success: res => {
        console.log(res)
      }
    })
  },
  /**
   * 点击左边返回
   */
  onClickLeft() {
    wx.navigateBack({
      delta: 2
    })
  },

  /**
   * 点击右边注销
   */
  onClickRight() {
    wx.navigateBack({
      delta: 3
    })
  },
})