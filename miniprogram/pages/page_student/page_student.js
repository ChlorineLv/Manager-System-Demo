// miniprogram/pages/page_student/page_stu.js
import Dialog from '../../miniprogram_npm/vant-weapp/dialog/dialog';
const db = wx.cloud.database();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    stu_id: 0,
    activeNamesCollapseBook: [],
    user_detail: [],
    order_list: [],
    order_his: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      stu_id: parseInt(options._id)
    });
    console.log("学生界面，stu_id:", this.data.stu_id);
    db.collection('tb_user').where({
      user_id: this.data.stu_id // 填入当前用户 openid
    }).get({
      success: res => {
        this.setData({
          user_detail: res.data[0]
        });
        // console.log("user_detail", this.data.user_detail);

      },
      fail: err => {
        console.error(err);
      }
    });

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
   * tab栏
   */
  onChangeTab(event) {
    // console.log("点击了", event)
  },

  /**
   * 教材预订Collapse
   */
  onChangeCollapseBook(event) {
    this.setData({
      activeNamesCollapseBook: event.detail
    });
    if (this.data.activeNamesCollapseBook.indexOf("1") != -1) {
      db.collection('tb_order').where({
        order_visible: true,
        order_timeout: false,
        order_grade: this.data.user_detail.user_grade,
        order_college: this.data.user_detail.user_college,
        order_major: this.data.user_detail.user_major,
      }).get({
        success: res => {
          // console.log(res.data);
          this.setData({
            order_list: res.data,
          });
          // console.log("order_list", this.data.order_list);
        },
        fail: err => {
          console.error(err);
        }
      })
    }
    if (this.data.activeNamesCollapseBook.indexOf("2") != -1) {
      console.log("打开了历史")
    }
  },

  /**
     * 点击预订教材详情，将ID传过去
     */
  viewItem: function (event) {
    var id = event.currentTarget.id;
    wx.navigateTo({
      url: '../page_student_book/page_student_book?book_id='+id +"&stu_id="+ this.data.stu_id,
    })
  },


})