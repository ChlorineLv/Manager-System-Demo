// miniprogram/pages/page_admin_sec_detail/page_admin_sec_detail.js
import Dialog from '../../miniprogram_npm/vant-weapp/dialog/dialog';
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    radioSecCheck: true,
    secID: "",
    sec_detail: [],
    secUpdateDate: "",
    secCheckDate: "",
    secCheckOpinion: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("教务员二手教材审核详情页面", options);
    db.collection("tb_sec").doc(options._id).get({
      success: res => {
        this.setData({
          sec_detail: res.data,
          secID: options._id,
          secUpdateDate: this.changeDateSingle(res.data.sec_create_date),
          radioSecCheck: (res.data.sec_status).toString(),
        })
        if (res.data.sec_check_date != null) {
          this.setData({
            secCheckDate: this.changeDateSingle(res.data.sec_check_date),
          })
        }
      },
      fail: err => {
        console.log("tb_sec:", err);
      }
    })
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
  onClickLeft: function () {
    wx.navigateBack({
      delta: 1
    })
  },

  /**
   * 点击右边注销
   */
  onClickRight: function () {
    wx.navigateBack({
      delta: 2
    })
  },

  /**
   * 单个日期处理
   */
  changeDateSingle: function (str) {
    var date = new Date(str);
    date = date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate() + "    " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    return date;
  },

  /**
   * 推荐审核选择
   */
  onChangeRadioSecCheck(event) {
    this.setData({
      radioSecCheck: event.detail,
      "sec_detail.sec_status": parseInt(event.detail),
    });
    // console.log(this.data.radioSecCheck)
  },

  /**
   * 审核留言
   */
  onChangeOpinion: function (event) {
    this.setData({
      "sec_detail.sec_opinion": event.detail,
    })
  },

  /**
   * 提交审核结果
   */
  btn_submit: function (event) {
    // console.log(this.data);
    wx.cloud.callFunction({
      // 云函数名称
      name: 'dbCheckSec',
      // 传给云函数的参数
      data: {
        secID: this.data.sec_detail._id,
        secCheckOpinion: this.data.sec_detail.sec_opinion,
        radioSecCheck: this.data.sec_detail.sec_status
      },
      success: res => {
        console.log("callFunction dbCheckSec result:", res.result)
        if (res.result.stats != undefined) {
          if (res.result.stats.updated == 1) {
            Dialog.confirm({
              title: '成功',
              message: '已成功审核，是否返回上一页'
            }).then(() => {
              // on confirm
              wx.navigateBack({
                delta: 1
              })
            }).catch(() => {
              db.collection("tb_sec").doc(this.data.secID).get({
                success: res => {
                  this.setData({
                    sec_detail: res.data,
                    secUpdateDate: (new Date(res.data.sec_create_date)).toLocaleString(),
                    radioSecCheck: (res.data.sec_status).toString(),
                    secCheckDate: (new Date(res.data.sec_check_date)).toLocaleString(),
                  })
                },
                fail: err => {
                  console.log("tb_sec:", err);
                }
              })
            });
          } else if (res.result.stats.updated == 0) {
            Dialog.confirm({
              title: '成功',
              message: '审核信息未发生更改。'
            }).then(() => {
              // on confirm
            }).catch(() => {
              // on cancel
            });
          }
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
        console.error("callFunction dbCheckSec err:", err)
      }
    });
  }
})