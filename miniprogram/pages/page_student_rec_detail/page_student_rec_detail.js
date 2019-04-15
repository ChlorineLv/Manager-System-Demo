// miniprogram/pages/page_student_rec_detail/page_student_rec_detail.js
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    rec_detail: [],
    recUpdateDate: '',
    recStatus: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log("学生推荐详情页面", options);
    db.collection("tb_rec").doc(options._id).get({
      success: res => {
        console.log("tb_rec", res.data);
        //状态：0不可见，1初始，10为通过，11为不通过
        let tmp_status = "";
        switch (res.data.rec_status) {
          case 0:
            {
              tmp_status = "被删除";
              break;
            }
          case 1:
            {
              tmp_status = "待审核";
              break;
            }
          case 10:
            {
              tmp_status = "审核通过";
              break;
            }
          case 11:
            {
              tmp_status = "审核不通过";
              break
            }
          default:
            {
              tmp_status = "状态未知，请联系管理员";
              break;
            }
        }
        this.setData({
          rec_detail: res.data,
          recUpdateDate: (new Date(res.data.rec_create_date)).toLocaleString(),
          recStatus: tmp_status
        })
      },
      fail: err => {
        console.log("tb_rec", err);
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
})