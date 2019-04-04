// miniprogram/pages/page_student_book/page_stu_book.js
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order_detail: [],
    user_detail: [],
    orderDetailCreateDate: '',
    hisModifyDate:"",
    activeNamesBookDetail: ['1', "2"],
    checkedBook: false,
    checkedBookSec: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    /* 此时options为 {book_id: "XJuH0t7E7L4w_jTe", stu_id: "11"} */
    console.log("学生教材预订登记页面", options);
    // 获取order里的详情
    db.collection("tb_order").where({
      order_visible: true,
      _id: options.book_id
    }).get({
      success: res => {
        this.setData({
          order_detail: res.data[0],
          orderDetailCreateDate: res.data[0].order_create_date.toLocaleString()
        });
        console.log("tb_order:", this.data.order_detail);
      }
    });
    // 获取user的详情
    db.collection("tb_user").where({
      user_id: parseInt(options.stu_id)
    }).get({
      success: res => {
        this.setData({
          user_detail: res.data[0]
        })
        console.log("tb_user:", this.data.user_detail)
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
   * 登记栏Collapse
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

  /**
   * 点击登记提交按钮
   */
  btn_submit() {
    console.log("订书：", this.data.checkedBook, "，二手：", this.data.checkedBookSec);
    db.collection("tb_his").where({
      his_stu_id: this.data.user_detail.user_id,
      his_book_isbn: this.data.order_detail.order_book_isbn
    }).get({
      success: res => {
        console.log("登记时搜索tb_his结果", res.data);
        // 若tb_his中查不到该生对于该ISBN的信息，则新建一条
        if (res.data.length==0) {
          db.collection('tb_his').add({
            // data 字段表示需新增的 JSON 数据
            data: {
              his_stu_id: parseInt(this.data.user_detail.user_id),
              his_college: this.data.order_detail.order_college,
              his_major: this.data.order_detail.order_major,
              his_grade: parseInt(this.data.user_detail.user_grade),
              his_semester: this.data.order_detail.order_semester,
              his_course: this.data.order_detail.order_course,
              his_teacher: this.data.order_detail.order_teacher,
              his_book_name: this.data.order_detail.order_book_name,
              his_book_isbn: parseInt(this.data.order_detail.order_book_isbn),
              his_first: this.data.checkedBook,
              his_sec: this.data.checkedBookSec,
              his_modify_date: new Date()
            },
            success: resAdd => {
              console.log("登记成功", resAdd);
              
              Dialog.confirm({
                title: '成功',
                message: '已成功发布，是否返回上一页'
              }).then(() => {
                // on confirm
                wx.navigateBack({
                  delta: 1
                })
              }).catch(() => {
                // on cancel
              });
            }
          })
        } else {
          // this.setData({
          //   hisModifyDate: res.data[0].his_modify_date.toLocaleString()
          // })
        }
      }
    })





  }
})