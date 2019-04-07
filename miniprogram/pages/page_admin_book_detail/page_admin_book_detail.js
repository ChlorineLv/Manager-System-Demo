// miniprogram/pages/page_admin_book_detail/page_admin_book_detail.js
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    checked: false,
    orderDetailCreateDate: "",
    order_detail: [],
    order_id: "",
    numBookFirst: 0,
    numBookSec: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log("教务员预定信息详情页面", options);
    // 查询该书的相关信息
    db.collection("tb_order").doc(options._id).get({
      success: res => {
        this.setData({
          order_id: options._id,
          order_detail: res.data,
          orderDetailCreateDate: res.data.order_create_date.toLocaleString()
        });
        if (res.data.order_timeout == true) {
          this.setData({
            checked: true
          });
        };
        // console.log("tb_order detail", this.data.order_detail);
        // 查询需要订书的表项
        db.collection("tb_his").where({
          his_grade: this.data.order_detail.order_grade,
          his_book_isbn: this.data.order_detail.order_book_isbn,
          his_first: true,
        }).get({
          success: resHis => {
            // console.log("tb_his", resHis.data);
            var countFirst = 0;
            var countSec = 0;
            for (let i = 0; i < resHis.data.length; i++) {
              if (resHis.data[i].his_sec) {
                countSec++;
              } else {
                countFirst++;
              }
            }
            this.setData({
              numBookFirst: countFirst,
              numBookSec: countSec
            })
            // console.log("numBookFirst:", this.data.numBookFirst, ",numBookSec:", this.data.numBookSec);
          },
          fail: err => {
            console.error(err);
          }
        })
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
   * 手动侦听“逾期”选项改变状态
   */
  onChange(event) {
    // 需要手动对 checked 状态进行更新
    this.setData({
      checked: event.detail
    });

  },

  /**
   * 更新按钮
   */
  btn_update(event) {
    console.log(event);
    db.collection("tb_order").doc(this.data.order_id).update({
      data: {
        order_timeout: this.data.checked
      },
      success: res => {
        console.log(res)
      },
      fail: err => {
        console.error(err);
      }
    })
  }
})