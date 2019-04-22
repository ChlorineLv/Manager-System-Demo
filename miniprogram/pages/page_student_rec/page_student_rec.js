// miniprogram/pages/page_student_rec/page_student_rec.js
const db = wx.cloud.database()
import Dialog from '../../miniprogram_npm/vant-weapp/dialog/dialog';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    stu_id: 0,
    // 第一行为学院名，第二行为初始学院的所有专业
    multiArray: [
      ["计算机科学与工程学院", "机械工程", "自动化"],
      ["计算机科学与技术", "计算机全英联合", "计算机全英创新", "网络工程", "信息安全", ]
    ],
    multiIndex: [0, 0],
    arraySemester: ["大一 - 上", "大一 - 下", "大二 - 上", "大二 - 下", "大三 - 上", "大三 - 下", "大四 - 上", "大四 - 下"],
    startGrade: (new Date().getFullYear()).toString(),
    indexSemester: 0,
    inputCollege: "",
    inputMajor: "",
    inputGrade: "",
    inputSemester: "",
    inputCourse: "",
    inputTeacher: "",
    inputBookName: "",
    inputBookPrice: "",
    inputBookPublisher: "",
    inputBookVersion: "",
    inputBookISBN: "",
    inputBookWriter: "",
    inputRemark: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log("推荐申请填写页面", options);
    this.setData({
      stu_id: parseInt(options._id)
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
   * Picker选择年级Grade
   */
  bindMultiPickerChange: function(e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      multiIndex: e.detail.value,
      inputCollege: this.data.multiArray[0][e.detail.value[0]],
      inputMajor: this.data.multiArray[1][e.detail.value[1]]
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
      inputGrade: e.detail.value
    })
  },

  /**
   * Field填写学期
   */
  bindPickerChange: function(e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      indexSemester: e.detail.value,
      inputSemester: this.data.arraySemester[e.detail.value]
    })
  },

  onChangeCourse: function(e) {
    this.setData({
      inputCourse: e.detail,
    })
  },
  onChangeTeacher: function(e) {
    this.setData({
      inputTeacher: e.detail,
    })
  },
  onChangeBookName: function(e) {
    this.setData({
      inputBookName: e.detail,
    })
  },
  onChangeBookISBN: function(e) {
    this.setData({
      inputBookISBN: e.detail,
    })
  },
  onChangeBookWriter: function(e) {
    this.setData({
      inputBookWriter: e.detail,
    })
  },
  onChangeBookVersion: function(e) {
    this.setData({
      inputBookVersion: e.detail,
    })
  },
  onChangeBookPublisher: function(e) {
    this.setData({
      inputBookPublisher: e.detail,
    })
  },
  onChangeBookPrice: function(e) {
    this.setData({
      inputBookPrice: e.detail,
    })
  },
  onChangeRemark: function(e) {
    this.setData({
      inputRemark: e.detail,
    })
  },

  /**
   * 确定发布
   */
  submit: function(e) {
    if (this.data.inputMajor == "" || this.data.inputBookName == "" || this.data.inputBookISBN == "" || this.data.inputBookPrice == "" || this.data.inputCollege == "" || this.data.inputCourse == "" || this.data.inputSemester == "") {
      Dialog.alert({
        title: '提示',
        message: '星号为必填项'
      }).then(() => {
        // on close
      });
    } else {
      wx.cloud.callFunction({
        // 云函数名称
        name: 'dbReleaseRec',
        // 传给云函数的参数
        data: {
          stu_id: this.data.stu_id,
          inputCollege: this.data.inputCollege,
          inputMajor: this.data.inputMajor,
          inputGrade: this.data.inputGrade,
          inputSemester: this.data.inputSemester,
          inputCourse: this.data.inputCourse,
          inputTeacher: this.data.inputTeacher,
          inputBookName: this.data.inputBookName,
          inputBookPrice: this.data.inputBookPrice,
          inputBookPublisher: this.data.inputBookPublisher,
          inputBookVersion: this.data.inputBookVersion,
          inputBookISBN: this.data.inputBookISBN,
          inputBookWriter: this.data.inputBookWriter,
          inputRemark: this.data.inputRemark,
        },
        success(res) {
          console.log("callFunction dbReleaseRec result:", res.result)
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
          console.error("callFunction dbReleaseRec err:", err)
        }
      });
    }

  }
})