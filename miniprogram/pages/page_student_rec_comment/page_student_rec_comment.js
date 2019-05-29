// miniprogram/pages/page_student_rec_comment/page_student_rec_comment.js
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    rec_detail: [],
    recUpdateDate: '',

    inputComment:"",
    comment_list:[],
    stu_id:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("推荐详情页面", options);
    db.collection("tb_rec").doc(options._id).get().then(res=>{
      // console.log("tb_rec", res.data);
      //状态：0不可见，1初始，10为通过，11为不通过
      let tmp_status = "";

      this.setData({
        stu_id: options.stu_id,
        rec_detail: res.data,
        recUpdateDate: this.changeDateSingle(res.data.rec_create_date),
      });

      db.collection("tb_com").where({
        com_rec_id: options._id
      }).get().then(res=>{
        this.setData({
          comment_list: this.changeComCreateDate(res.data)
        });
      })
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
   * rec_create_date日期处理
   */
  changeComCreateDate: function (arr) {
    for (let i = 0; i < arr.length; i++) {
      let date = new Date(arr[i].com_create_date);
      // arr[i].rec_create_date = date.toLocaleString();
      arr[i].com_create_date = date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate() + "   " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    }
    return arr;
  },

  onChangeComment: function (e) {
    this.setData({
      inputComment: e.detail,
    })
  },

  /**提交 */
  submit: function(){
    wx.cloud.callFunction({
      name:"dbReleaseCom",
      data:{
        stu_id: this.data.stu_id,
        rec_id: this.data.rec_detail._id,
        com_comment: this.data.inputComment,
      }
    }).then(res=>{
      console.log(res);
    })
  }
})