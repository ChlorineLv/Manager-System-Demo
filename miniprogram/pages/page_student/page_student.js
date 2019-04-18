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
    urlSec: "",
    activeNamesBook: [],
    activeNamesBookRec: [],
    activeNamesBookSec: [],
    user_detail: [],
    order_list: [],
    order_his: [],
    rec_list: [],
    sec_list: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      stu_id: parseInt(options._id),
      urlRec: "../page_student_rec/page_student_rec?_id=" + options._id,
      urlSec: "../page_student_sec/page_student_sec?_id=" + options._id,
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
    this.setData({
      activeNamesBook: [],
      activeNamesBookRec: [],
      activeNamesBookSec: [],
    })
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
   * sec_create_date日期处理
   */
  changeSecCreateDate: function (arr) {
    for (let i = 0; i < arr.length; i++) {
      let date = new Date(arr[i].sec_create_date);
      arr[i].sec_create_date = date.getFullYear() + "年" + date.getMonth() + "月" + date.getDay() + "日" + date.getHours() + "时" + date.getMinutes() + "分" + date.getSeconds() + "秒";
    }
    return arr;
  },

  /**
     * his_create_date日期处理
     */
  changeHisUpdateDate: function (arr) {
    for (let i = 0; i < arr.length; i++) {
      let date = new Date(arr[i].his_update_date);
      arr[i].his_update_date = date.getFullYear() + "年" + date.getMonth() + "月" + date.getDay() + "日" + date.getHours() + "时" + date.getMinutes() + "分" + date.getSeconds() + "秒";
    }
    return arr;
  },

  /**
   * rec_create_date日期处理
   */
  changeRecCreateDate: function (arr) {
    for (let i = 0; i < arr.length; i++) {
      let date = new Date(arr[i].rec_create_date);
      arr[i].rec_create_date = date.getFullYear() + "年" + date.getMonth() + "月" + date.getDay() + "日" + date.getHours() + "时" + date.getMinutes() + "分" + date.getSeconds() + "秒";
    }
    return arr;
  },

  /**
   * order_create_date日期处理
   */
  changeOrderCreateDate: function (arr) {
    for (let i = 0; i < arr.length; i++) {
      let date = new Date(arr[i].order_create_date);
      arr[i].order_create_date = date.getFullYear() + "年" + date.getMonth() + "月" + date.getDay() + "日" + date.getHours() + "时" + date.getMinutes() + "分" + date.getSeconds() + "秒";
    }
    return arr;
  },

  /**
   * 右边注销
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
    // this.setData({
    //   activeNamesBook: [],
    //   activeNamesBookRec: [],
    //   activeNamesBookSec: [],
    // })
  },

  /**
   * 教材预订Collapse栏目
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
            order_list: this.changeOrderCreateDate(res.data),
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
            his_list: this.changeHisUpdateDate(res.data),
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
   * 预订教材详情，将ID传过去
   */
  viewItemOrder: function(event) {
    let id = event.currentTarget.id;
    wx.navigateTo({
      url: '../page_student_book/page_student_book?book_id=' + id + "&stu_id=" + this.data.stu_id,
    })
  },

  /**
   * 预订历史，将ID传过去
   */
  viewItemHis: function(event) {
    let id = event.currentTarget.id;
    wx.navigateTo({
      url: '../page_student_book_his/page_student_book_his?_id=' + id,
    })
  },

  /**
   * 推荐历史栏目
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
            rec_list: this.changeRecCreateDate(res.data)
          })
        },
        fail: err => {
          console.log(err);
        }
      })
    }
  },


  /**
   * 推荐历史的详情
   */
  viewItemRec: function(event) {
    let id = event.currentTarget.id;
    wx.navigateTo({
      url: '../page_student_rec_detail/page_student_rec_detail?_id=' + id,
    })
  },

  /**
   * 二手申请历史栏目
   */
  onChangeCollapseBookSec: function (event) {
    this.setData({
      activeNamesBookSec: event.detail
    });
    if (this.data.activeNamesBookSec.indexOf("1") != -1) {
      // console.log("推荐历史", event);
      db.collection("tb_sec").where({
        sec_stu_id: this.data.stu_id,
      }).get({
        success: res => {
          // console.log("tb_sec", res);
          this.setData({
            sec_list: this.changeSecCreateDate(res.data)
          })
        },
        fail: err => {
          console.log(err);
        }
      })
    }
  },

  /**
   * 二手申请的详情
   */
  viewItemSec: function (event) {
    let id = event.currentTarget.id;
    wx.navigateTo({
      url: '../page_student_sec_detail/page_student_sec_detail?_id=' + id,
    })
  },
})