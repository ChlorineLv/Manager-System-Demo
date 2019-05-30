// miniprogram/pages/index_detail/index_detail.js
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    faceToken: "",
    faceBase64: "",
    src: "",
    faceset_token: "ca1ec46366958e081e6e5cca816bdb26",
    user_detail: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.ctx = wx.createCameraContext()
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

  takePhotoRecognize: function() {
    this.setData({
      stuId: null
    })
    this.ctx.takePhoto({
      quality: 'high',
      success: (res) => {
        this.setData({
          src: res.tempImagePath
        });

        wx.getFileSystemManager().readFile({
          filePath: this.data.src,
          encoding: 'base64',
          success: res => {
            console.log(res);
            this.setData({
              faceBase64: res.data
            });

            wx.request({
              url: 'https://api-cn.faceplusplus.com/facepp/v3/search',
              data: {
                "api_key": "JIKtvluI6JAMSp04R28g8oviWudMefHX",
                "api_secret": "pH9-WNfy0qDmj1310LaEBGT8dSf71MBU",
                "faceset_token": "ca1ec46366958e081e6e5cca816bdb26",
                "image_base64": res.data
              },
              header: {
                'content-type': 'application/x-www-form-urlencoded'
              },
              method: 'POST',
              success: res => {
                console.log("search", res.data.results);
                db.collection('tb_user').where({
                  user_face: res.data.results[0].face_token
                }).get().then(res => {
                  console.log("tb_user", res)
                  this.setData({
                    user_detail: res.data[0],

                  })
                })

              },
              fail: err => {
                console.log(err)
              },
              complete: res => {
                // console.log(res)
              },
            })
          }
        })
      }
    })
  },

  faceSign: function() {
    if (this.data.user_detail.user_id!=undefined) {
      if (this.data.user_detail.user_college == "教务处") {
        wx.navigateTo({
          url: '../page_admin/page_admin?user_id=' + this.data.user_detail.user_id,
        })
      } else {
        wx.navigateTo({
          url: '../page_student/page_student?user_id=' + this.data.user_detail.user_id,
        })
      }
    }
  }
})