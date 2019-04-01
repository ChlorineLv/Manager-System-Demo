import Toast from '../../miniprogram_npm/vant-weapp/toast/toast';
const db = wx.cloud.database();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    in_acc: '',
    in_pwd: ''
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
    db.collection('tb_user').where({
      user_id: parseInt(this.data.in_acc)
    }).get({
      // 采用箭头函数使this指回Page中
      success: (res) => {
        console.log(res.data[0])
        // 账号是否存在
        if (res.data[0] != undefined) {
          // 密码是否正确
          if (this.data.in_pwd == res.data[0].user_pwd) {
            console.log("登陆成功");
            if (res.data[0].user_college == '教务处') {
              console.log("教务员");
              wx.navigateTo({
                url: '../page_admin/page_admin',
              })
            } else {
              console.log("学生");
              wx.navigateTo({
                url: '../page_student/page_student?_id='+this.data.in_acc,
              })
            }
          } else {
            Toast("密码错误");
          }
        } else {
          Toast("账号不存在");
        }
      }
    })
  },

  onClickIcon() {
    Toast("密码为账号本身");
  }
})