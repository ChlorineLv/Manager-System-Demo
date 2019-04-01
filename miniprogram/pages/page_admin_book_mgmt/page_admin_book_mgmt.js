// miniprogram/pages/page_admin_book_mgmt/page_admin_book_mgmt.js
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeNames: [],
    order_list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("教务员预定管理页面");
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
   * 点开Collapse
   */
  onChangeCollapse(event) {
    this.setData({
      activeNames: event.detail
    });
  },

  /**
   * 用户点击查询
   */
  btn_search(options) {
    db.collection('tb_order').get({
      success: res => {
        
        console.log(res.data);
        this.setData({
          order_list: res.data,
          // book: res.data,
          // id: options.id
        });
      },
      fail: err => {
        console.error(err);
      }
    })
  },

  /**
   * 点击详情，将ID传过去
   */
  viewItem: function(event) {
    var id = event.currentTarget.id;
    wx.navigateTo({
      url: '../page_admin_book_detail/page_admin_book_detail?_id='+id,
    })
  }
})