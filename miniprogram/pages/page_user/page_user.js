// miniprogram/pages/page_user/page_user.js
import Dialog from "../../miniprogram_npm/vant-weapp/dialog/dialog";
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 第一行为学院名，第二行为初始学院的所有专业
    multiArray: [
      ["计算机科学与工程学院", "机械与汽车工程学院", "自动化"],
      ["计算机科学与技术", "计算机全英联合", "计算机全英创新", "网络工程", "信息安全", ]
    ],
    multiIndex: [0, 0],
    arraySemester: ["大一上", "大一下", "大二上", "大二下", "大三上", "大三下", "大四上", "大四下"],
    startGrade: (new Date().getFullYear()).toString(),
    indexSemester: 0,
    inputID: "",
    inputPwd: "",
    inputCollege: "",
    inputMajor: "",
    inputGrade: "",
    user_list: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log("用户管理界面", options._id);
    db.collection("tb_user").where({
      _id: options._id
    }).get().then(res => {
      this.setData({
        user_list: res.data[0]
      })
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
   * Picker选择年级Grade
   */
  bindMultiPickerChange: function(e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      multiIndex: e.detail.value,
      "user_list.user_college": this.data.multiArray[0][e.detail.value[0]],
      "user_list.user_major": this.data.multiArray[1][e.detail.value[1]]
    })
  },

  /**
   * Picker改变第一列后的变化
   */
  bindMultiPickerColumnChange: function(e) {
    // console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    data.multiIndex[e.detail.column] = e.detail.value;
    // 第一列的变化导致第二列内容的变化：各学院的各专业
    switch (data.multiIndex[0]) {
      case 0:
        data.multiArray[1] = ["计算机科学与技术", "计算机全英联合", "计算机全英创新", "网络工程", "信息安全", ];
        break;
      case 1:
        data.multiArray[1] = ["机械工程"];
        break;
      case 2:
        data.multiArray[1] = ["自动化"];
        break;
    }
    this.setData(data);
  },

  /**
   * Field填写年级
   */
  bindDateChange: function(e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      "user_list.user_grade": e.detail.value
    })
  },

  /**
   * input填写ID
   */
  onChangeID: function(e) {
    // console.log(e)
    this.setData({
      "user_list.user_id": e.detail
    })
  },

  /**
   * input填写密码
   */
  onChangePwd: function(e) {
    // console.log(e)
    this.setData({
      "user_list.user_pwd": e.detail
    })
  },

  /**
   * 更新按钮
   */
  submit(event) {
    if (this.data.user_list.user_major == "" || this.data.user_list.user_college == "" || this.data.user_list.user_id == "" || this.data.user_list.user_grade == "" || this.data.user_list.user_pwd == "") {
      Dialog.alert({
        title: '提示',
        message: '星号为必填项'
      }).then(() => {
        // on close
      });
    } else {
      wx.cloud.callFunction({
        // 云函数名称
        name: 'dbUpdateUser',
        // 传给云函数的参数
        data: this.data.user_list,
        success: res => {
          console.log("callFunction dbUpadteOrder result:", res.result)
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
          console.error("callFunction dbUpadteOrder err:", err)
        }
      });
    }
  }
})