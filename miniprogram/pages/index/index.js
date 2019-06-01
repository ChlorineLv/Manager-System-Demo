import Toast from '../../miniprogram_npm/vant-weapp/toast/toast';
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    in_acc: '',
    in_pwd: '',
    verDemo: "v1.03.190601",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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

  onAccChange: function(event) {
    // event.detail 为当前输入的值
    this.data.in_acc = event.detail;
  },

  onPwdChange: function(event) {
    this.data.in_pwd = event.detail;
  },

  onClickSign: function() {
    /**
     * 用户点击登陆
     */
    wx.cloud.callFunction({
      name: "dbLogin",
      data: this.data,
      success: res => {
        // 账号是否存在
        if (res.result == 0) {
          Toast("账号不存在");
        } else if (res.result.boolPassword == false) {
          Toast("密码错误");
        } else if (res.result.userCollege == "教务处") {
          wx.navigateTo({
            url: '../page_admin/page_admin?user_id=' + this.data.in_acc,
          })
        } else {
          wx.navigateTo({
            url: '../page_student/page_student?user_id=' + this.data.in_acc,
          })
        }
      },
      fail: err => {
        console.log(err);
      }
    })
  },

  onClickIcon() {
    Toast("初始密码为账号本身");
  },

  detailJump: function() {
    // Toast("版本号：" + wx.getSystemInfoSync());
    console.log("版本：" + this.data.verDemo + "；请联系：ChlorineCL2@outlook.com");
    // console.log(wx.getSystemInfoSync()); 
  },

  onClickFaceSign: function() {
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.camera']) {
          wx.authorize({
            scope: 'scope.camera',
            success() {
              wx.navigateTo({
                url: '../index_detail/index_detail',
              })
            },
            fail() {
              wx.showModal({
                title: '提示',
                content: '若点击不授权，将无法使用此功能',
                cancelText: '不授权',
                cancelColor: '#999',
                confirmText: '前往授权',
                confirmColor: '#1AAD19',
                success(res) {
                  if (res.confirm) {
                    wx.openSetting({
                      success(res) {
                        wx.navigateTo({
                          url: '../index_detail/index_detail',
                        })
                        console.log(res.authSetting)
                      }
                    })
                  } else if (res.cancel) {
                    console.log('用户点击取消')
                  }
                }
              })
            }
          })
        } else {
          wx.navigateTo({
            url: '../index_detail/index_detail',
          })
        }
      }
    })
  }
})