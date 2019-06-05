// miniprogram/pages/page_user_face/page_user_face.js
import Dialog from '../../miniprogram_npm/vant-weapp/dialog/dialog';
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user_detail: [],
    src: "",
    faceToken: "",
    faceBase64: "",
    inputStuId: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.ctx = wx.createCameraContext();
    db.collection("tb_user").where({
      user_id: parseInt(options._id)
    }).get().then(res => {
      this.setData({
        user_detail: res.data[0]
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

  takePhotoRegister: function() {
    Dialog.alert({
      message: '实体认证,请侧着头'
    }).then(() => {
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
                url: 'https://api-cn.faceplusplus.com/facepp/v3/detect',
                data: {
                  "api_key": "JIKtvluI6JAMSp04R28g8oviWudMefHX",
                  "api_secret": "pH9-WNfy0qDmj1310LaEBGT8dSf71MBU",
                  "image_base64": res.data,
                  "return_attributes": "headpose",
                },
                header: {
                  'content-type': 'application/x-www-form-urlencoded'
                },
                method: 'POST',
                success: res => {
                  console.log("实体detect", res)
                  if (res.data.faces.length == 1) {
                    if (res.data.faces[0].attributes.headpose.yaw_angle >= 25 || res.data.faces[0].attributes.headpose.yaw_angle <= -25) {
                      Dialog.alert({
                        message: '实体认证通过，请摆正头部，进行登记。'
                      }).then(() => {
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
                                // console.log(res);
                                this.setData({
                                  faceBase64: res.data
                                });

                                wx.request({
                                  url: 'https://api-cn.faceplusplus.com/facepp/v3/detect',
                                  data: {
                                    "api_key": "JIKtvluI6JAMSp04R28g8oviWudMefHX",
                                    "api_secret": "pH9-WNfy0qDmj1310LaEBGT8dSf71MBU",
                                    "image_base64": res.data,
                                    "return_attributes": "headpose",
                                  },
                                  header: {
                                    'content-type': 'application/x-www-form-urlencoded'
                                  },
                                  method: 'POST',
                                  success: res => {
                                    console.log("detect", res);
                                    if (res.data.faces.length == 1) {

                                      this.setData({
                                        faceToken: res.data.faces[0].face_token
                                      });

                                      wx.request({
                                        url: 'https://api-cn.faceplusplus.com/facepp/v3/faceset/removeface',
                                        data: {
                                          "api_key": "JIKtvluI6JAMSp04R28g8oviWudMefHX",
                                          "api_secret": "pH9-WNfy0qDmj1310LaEBGT8dSf71MBU",
                                          "faceset_token": "ca1ec46366958e081e6e5cca816bdb26",
                                          "face_tokens": this.data.user_detail.user_face
                                        },
                                        header: {
                                          'content-type': 'application/x-www-form-urlencoded'
                                        },
                                        method: 'POST',
                                        success: res => {
                                          console.log("delete face", res);
                                          // 存入user中
                                          wx.cloud.callFunction({
                                            name: "dbUserFace",
                                            data: {
                                              id: this.data.user_detail._id,
                                              faceToken: this.data.faceToken
                                            },
                                            success: res => {
                                              console.log("call", res);
                                              if (res.result.res.stats.updated == 1) {
                                                // 存入faceset中
                                                wx.request({
                                                  url: 'https://api-cn.faceplusplus.com/facepp/v3/faceset/addface',
                                                  data: {
                                                    "api_key": "JIKtvluI6JAMSp04R28g8oviWudMefHX",
                                                    "api_secret": "pH9-WNfy0qDmj1310LaEBGT8dSf71MBU",
                                                    "faceset_token": "ca1ec46366958e081e6e5cca816bdb26",
                                                    "face_tokens": this.data.faceToken
                                                  },
                                                  header: {
                                                    'content-type': 'application/x-www-form-urlencoded'
                                                  },
                                                  method: 'POST',
                                                  success: res => {
                                                    console.log("faceset add token", res);
                                                    Dialog.alert({
                                                      message: '已登记'
                                                    }).then(() => {});

                                                    // 查询现有情况
                                                    wx.request({
                                                      url: 'https://api-cn.faceplusplus.com/facepp/v3/faceset/getdetail',
                                                      data: {
                                                        "api_key": "JIKtvluI6JAMSp04R28g8oviWudMefHX",
                                                        "api_secret": "pH9-WNfy0qDmj1310LaEBGT8dSf71MBU",
                                                        "faceset_token": "ca1ec46366958e081e6e5cca816bdb26",
                                                      },
                                                      header: {
                                                        'content-type': 'application/x-www-form-urlencoded'
                                                      },
                                                      method: 'POST',
                                                      success: res => {
                                                        console.log("getdetail", res);

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
                                            }
                                          })
                                        },
                                        fail: err => {
                                          console.log(err)
                                        },
                                        complete: res => {
                                          // console.log(res)
                                        },
                                      })
                                    } else if (res.data.faces.length > 1) {
                                      Dialog.alert({
                                        message: '识别到超过一张脸，请重试。'
                                      }).then(() => {});
                                    } else {
                                      Dialog.alert({
                                        message: '识别不到人脸，请重试。'
                                      }).then(() => {});
                                    }
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
                      })
                    } else {
                      Dialog.alert({
                        message: '请重试'
                      }).then(() => {})
                    }
                  } else {
                    Dialog.alert({
                      message: '请重试'
                    }).then(() => {})
                  }
                }
              });
            }
          })
        }
      })
    });
  },

  takePhotoRecognize: function() {
    Dialog.alert({
      message: '实体认证,请侧着头'
    }).then(() => {
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
                url: 'https://api-cn.faceplusplus.com/facepp/v3/detect',
                data: {
                  "api_key": "JIKtvluI6JAMSp04R28g8oviWudMefHX",
                  "api_secret": "pH9-WNfy0qDmj1310LaEBGT8dSf71MBU",
                  "image_base64": res.data,
                  "return_attributes": "headpose",
                },
                header: {
                  'content-type': 'application/x-www-form-urlencoded'
                },
                method: 'POST',
                success: res => {
                  console.log("detect", res)
                  if (res.data.faces.length == 1) {
                    if (res.data.faces[0].attributes.headpose.yaw_angle >= 25 || res.data.faces[0].attributes.headpose.yaw_angle <= -25) {
                      Dialog.alert({
                        message: '实体认证通过，请摆正头部，进行识别。'
                      }).then(() => {
                        this.setData({
                          inputStuId: null
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
                                  url: 'https://api-cn.faceplusplus.com/facepp/v3/detect',
                                  data: {
                                    "api_key": "JIKtvluI6JAMSp04R28g8oviWudMefHX",
                                    "api_secret": "pH9-WNfy0qDmj1310LaEBGT8dSf71MBU",
                                    "image_base64": res.data,
                                    "return_attributes": "headpose",
                                  },
                                  header: {
                                    'content-type': 'application/x-www-form-urlencoded'
                                  },
                                  method: 'POST',
                                  success: res => {
                                    console.log("detect", res)
                                  }
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
                                    console.log("search", res);
                                    if (res.data.results != undefined) {
                                      if (res.data.results[0].confidence >= 75) {
                                        db.collection('tb_user').where({
                                          user_face: res.data.results[0].face_token
                                        }).get().then(res => {
                                          console.log("tb_user", res)
                                          this.setData({
                                            inputStuId: res.data[0].user_id
                                          })
                                        })
                                      } else {
                                        Dialog.alert({
                                          message: '识别误差过大'
                                        }).then(() => {});
                                      }
                                    } else {
                                      Dialog.alert({
                                        message: '无法识别'
                                      }).then(() => {});
                                    }
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
                      })
                    } else {
                      Dialog.alert({
                        message: '请重试。'
                      }).then(() => {})
                    }
                  } else {
                    Dialog.alert({
                      message: '请重试。'
                    }).then(() => {})
                  }
                }
              });
            }
          })
        }
      })
    })
  },

  error(e) {
    console.log(e.detail)
  },
})