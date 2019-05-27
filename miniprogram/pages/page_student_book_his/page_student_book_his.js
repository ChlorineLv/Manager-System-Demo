// miniprogram/pages/page_student_book_his/page_student_book_his.js
import Dialog from '../../miniprogram_npm/vant-weapp/dialog/dialog';
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    his_detail: [],
    hisUpdateDate: "",
    checkedBook: false,
    checkedBookSec: false,
    id_His: "",
    boolOrderTimeout: true,
    boolOrderVisible: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log("学生教材预订历史详情页面", options);
    this.setData({
      id_His: options._id
    });
    db.collection("tb_his").doc(options._id).get({
      success: res => {
        console.log("tb_his", res);
        this.setData({
          his_detail: res.data,
          checkedBook: 0 || res.data.his_first,
          checkedBookSec: res.data.his_sec & res.data.his_first,
          hisUpdateDate: this.changeDateSingle(res.data.his_update_date),
          hisOrderID: res.data.his_order_id
        });
        db.collection("tb_order").where({
          _id: this.data.hisOrderID
        }).get({
          success: res => {
            // console.log(res.data);
            this.setData({
              boolOrderTimeout: res.data[0].order_timeout,
              boolOrderVisible: res.data[0].order_visible,
            })
          }
        })
      },
      fail: err => {
        console.log(err);
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
  onClickLeft: function() {
    wx.navigateBack({
      delta: 1
    })
  },

  /**
   * 点击右边注销
   */
  onClickRight: function() {
    wx.navigateBack({
      delta: 2
    })
  },

  /**
   * his_update_date日期处理
   */
  changeDateSingle: function(str) {
    var date = new Date(str);
    date = date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate() + "    " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    return date;
  },

  /**
   * 手动侦听“预订”选项改变状态
   */
  onChangeSwitchBook(event) {
    if (!this.data.boolOrderTimeout && this.data.boolOrderVisible) {
      this.setData({
        checkedBook: event.detail
      });
    } else {
      Dialog.alert({
        title: '提示',
        message: '预订已失效，不再更新。'
      }).then(() => {
        // on close
      });
    }
  },

  /**
   * 手动侦听“二手书”选项改变状态
   */
  onChangeSwitchBookSec(event) {
    if (!this.data.boolOrderTimeout && this.data.boolOrderVisible) {
      this.setData({
        checkedBookSec: event.detail
      });
    } else {
      Dialog.alert({
        title: '提示',
        message: '预订已失效，不再更新。'
      }).then(() => {
        // on close
      });
    }
  },

  /**
   * 点击登记提交按钮
   */
  btn_submit() {
    // console.log("提交", this.data);
    // console.log(this.data.boolOrderTimeout)
    if (!this.data.boolOrderTimeout && !this.data.boolOrderVisible) {
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
      Dialog.alert({
        title: '提示',
        message: '预订已失效，不再更新。'
      }).then(() => {
        // on close
      });
    }
  }
})