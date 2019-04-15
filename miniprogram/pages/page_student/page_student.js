// miniprogram/pages/page_student/page_stu.js
import Dialog from '../../miniprogram_npm/vant-weapp/dialog/dialog';
const db = wx.cloud.database();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    stu_id: 0,
    urlRec: "",
    activeNamesBook: [],
    activeNamesBookRec: [],
    user_detail: [],
    order_list: [],
    order_his: [],
    rec_list: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      stu_id: parseInt(options._id),
      urlRec: "../page_student_rec/page_student_rec?_id=" + options._id,
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
  onClickRight: function() {
    wx.navigateBack({
      delta: 1
    })
  },

  /**
   * tab栏
   */
  onChangeTab: function(event) {
    // console.log("点击了", event)
  },

  /**
   * 点击教材预订Collapse栏目
   */
  onChangeCollapseBook: function(event) {
    this.setData({
      activeNamesBook: event.detail
    });
    if (this.data.activeNamesBook.indexOf("1") != -1) {
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
    if (this.data.activeNamesBook.indexOf("2") != -1) {
      db.collection('tb_his').where({
        his_grade: this.data.user_detail.user_grade,
        his_college: this.data.user_detail.user_college,
        his_major: this.data.user_detail.user_major,
        his_stu_id: this.data.stu_id
      }).get({
        success: res => {
          // console.log("tb_his",res.data);
          this.setData({
            his_list: res.data,
          });
          // console.log("order_list", this.data.order_list);
        },
        fail: err => {
          console.error(err);
        }
      })
    }
  },

  /**
   * 点击预订教材详情，将ID传过去
   */
  viewItem: function(event) {
    let id = event.currentTarget.id;
    wx.navigateTo({
      url: '../page_student_book/page_student_book?book_id=' + id + "&stu_id=" + this.data.stu_id,
    })
  },

  /**
   * 点击预订历史，将ID传过去
   */
  viewItemHis: function(event) {
    let id = event.currentTarget.id;
    wx.navigateTo({
      url: '../page_student_book_his/page_student_book_his?_id=' + id,
    })
  },

  /**
   * 点击推荐历史栏目
   */
  onChangeCollapseBookRec: function(event) {
    this.setData({
      activeNamesBookRec: event.detail
    });
    if (this.data.activeNamesBookRec.indexOf("1") != -1) {
      // console.log("推荐历史", event);
      db.collection("tb_rec").where({
        rec_stu_id: this.data.stu_id,
      }).get({
        success: res => {
          // console.log("tb_rec", res);
          this.setData({
            rec_list: res.data
          })
        },
        fail: err => {
          console.log(err);
        }
      })
    }
  },


  /**
   * 点击推荐历史的详情
   */
  viewItemRec: function(event) {
    let id = event.currentTarget.id;
    wx.navigateTo({
      url: '../page_student_rec_detail/page_student_rec_detail?_id=' + id,
    })
  }
})