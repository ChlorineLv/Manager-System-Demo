// miniprogram/pages/page_student_book/page_stu_book.js
import Dialog from '../../miniprogram_npm/vant-weapp/dialog/dialog';
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeNamesBookDetail: ['1'],
    orderDetailCreateDate: '',
    hisUpdateDate: "",
    checkedBook: false,
    checkedBookSec: false,
    order_detail: [],
    user_detail: [],
    his_detail: [],
    boolHis: false,
    boolSearchDone: false,
    // update必须用doc，而且不能用his_detail._id
    id_His: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({

    })
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
          // orderDetailCreateDate: (new Date(res.data[0].order_create_date)).toLocaleString()
          orderDetailCreateDate: this.changeDateSingle(res.data[0].order_create_date)
        });
        // console.log("tb_order:", this.data.order_detail);
      },
      fail: err => {
        console.error(err);
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
        // console.log("tb_user:", this.data.user_detail)
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
   * order_create_date日期处理
   */
  changeDateSingle: function (str) {
    var date = new Date(str);
    date = date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    return date;
  },

  /**
   * 登记栏、详情栏Collapse
   */
  onChangeCollapseBookDetail(event) {
    this.setData({
      activeNamesBookDetail: event.detail
    });
    if (this.data.activeNamesBookDetail.indexOf("2") != -1) {
      // 获取曾经是否有his
      db.collection("tb_his").where({
        his_stu_id: parseInt(this.data.user_detail.user_id),
        his_book_isbn: parseInt(this.data.order_detail.order_book_isbn)
      }).get({
        success: res => {
          // console.log("tb_his", res);
          if (res.data.length != 0) {
            this.setData({
              his_detail: res.data[0],
              checkedBook: res.data[0].his_first,
              checkedBookSec: res.data[0].his_sec & res.data[0].his_first,
              hisUpdateDate: (new Date(res.data[0].his_update_date)).toLocaleString(),
              id_His: res.data[0]._id,
              boolHis: true
            })
          };
          this.setData({
            boolSearchDone: true,
          })
          // console.log("tb_his:", this.data.boolHis, this.data.his_detail)
        },
        fail: err => {
          console.error(err);
        }
      });
    }
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
    // console.log("订书：", this.data.checkedBook, "，二手：", this.data.checkedBookSec);
    if (this.data.boolHis == true) {
      // 如果存在预订历史
      wx.cloud.callFunction({
        name: 'dbUpdateHis',
        data: {
          id_His: this.data.id_His,
          checkedBook: this.data.checkedBook,
          checkedBookSec: this.data.checkedBookSec,
        },
        success(res) {
          console.log("callFunction dbUpdateHis result:", res.result)
          if (res.result.stats.updated == 1) {
            Dialog.confirm({
              title: '成功',
              message: '已成功更新，是否返回上一页'
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
          console.error("callFunction dbUpdateHis err:", err)
        }
      });
    } else {
      wx.cloud.callFunction({
        name: 'dbReleaseHis',
        data: this.data,
        success(res) {
          console.log("callFunction dbReleaseHis result:", res.result)
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
          console.error("callFunction dbReleaseHis err:", err)
        }
      });
    }
  }
})