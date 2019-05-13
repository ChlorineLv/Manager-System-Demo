// miniprogram/pages/page_admin_rec_detail/page_admin_rec_detail.js
import Dialog from '../../miniprogram_npm/vant-weapp/dialog/dialog';
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    radioRecCheck: true,
    recID:"",
    rec_detail: [],
    recUpdateDate: "",
    recCheckDate: "",
    recCheckOpinion: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log("教务员参考书推荐审核详情页面", options);
    db.collection("tb_rec").doc(options._id).get({
      success: res => {
        this.setData({
          rec_detail: res.data,
          recID: options._id,
          recUpdateDate: (new Date(res.data.rec_create_date)).toLocaleString(),
          radioRecCheck: (res.data.rec_status).toString(),
        })
        if (res.data.rec_check_date != null) {
          this.setData({
            recCheckDate: (new Date(res.data.rec_check_date)).toLocaleString(),
          })
        }
      },
      fail: err => {
        console.log("tb_rec:", err);
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
   * 推荐审核选择
   */
  onChangeRadioRecCheck(event) {
    this.setData({
      radioRecCheck: event.detail,
      "rec_detail.rec_status": parseInt(event.detail),
    });
    // console.log(this.data.radioRecCheck)
  },

  /**
   * 审核留言
   */
  onChangeOpinion: function(event) {
    this.setData({
      "rec_detail.rec_opinion": event.detail,
    })
  },

  /**
   * 提交审核结果
   */
  btn_submit: function(event) {
    console.log(this.data);
    wx.cloud.callFunction({
      // 云函数名称
      name: 'dbCheckRec',
      // 传给云函数的参数
      data: {
        recID: this.data.rec_detail._id,
        recCheckOpinion: this.data.rec_detail.rec_opinion,
        radioRecCheck: this.data.rec_detail.rec_status
      },
      success:res=> {
        console.log("callFunction dbCheckRec result:", res.result)
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
              db.collection("tb_rec").doc(this.data.recID).get({
                success: res => {
                  this.setData({
                    rec_detail: res.data,
                    recUpdateDate: (new Date(res.data.rec_create_date)).toLocaleString(),
                    radioRecCheck: (res.data.rec_status).toString(),
                    recCheckDate: (new Date(res.data.rec_check_date)).toLocaleString(),
                  })
                },
                fail: err => {
                  console.log("tb_rec:", err);
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
        console.error("callFunction dbCheckRec err:", err)
      }
    });
  }
})