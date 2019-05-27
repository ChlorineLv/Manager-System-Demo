// miniprogram/pages/page_admin_book_detail/page_admin_book_detail.js
import Dialog from '../../miniprogram_npm/vant-weapp/dialog/dialog';
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    checked: false,
    orderDetailCreateDate: "",
    orderDetailUpdateDate: "",
    order_detail: [],
    update_detail: [],
    order_id: "",
    numBookFirst: null,
    numBookSec: null,
    // 第一行为学院名，第二行为初始学院的所有专业
    multiArray: [
      ["计算机科学与工程学院", "机械与汽车工程学院", "自动化"],
      ["计算机科学与技术", "计算机全英联合", "计算机全英创新", "网络工程", "信息安全", ]
    ],
    multiIndex: [0, 0],
    arraySemester: ["大一上", "大一下", "大二上", "大二下", "大三上", "大三下", "大四上", "大四下"],
    startGrade: (new Date().getFullYear()).toString(),
    usedBook: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log("教务员预定信息详情页面", options);
    // 查询该书的相关信息
    db.collection("tb_order").doc(options._id).get({
      success: res => {
        // console.log("tb_order:", res);
        this.setData({
          order_id: options._id,
          order_detail: res.data,
          orderDetailCreateDate: this.changeDateSingle(res.data.order_create_date),
        });
        if (res.data.order_update_date != null) {
          this.setData({
            orderDetailUpdateDate: this.changeDateSingle(res.data.order_update_date),
          })
        }
        if (res.data.order_timeout == true) {
          this.setData({
            checked: true
          });
        };
        // console.log("tb_order detail", this.data.order_detail);
        // 查询需要订书的表项
        db.collection("tb_his").where({
          his_grade: this.data.order_detail.order_grade,
          his_book_isbn: this.data.order_detail.order_book_isbn,
          his_college: this.data.order_detail.order_college,
          his_major: this.data.order_detail.order_major,
          his_first: true,
        }).get({
          success: resHis => {
            console.log("tb_his", resHis.data);
            var countFirst = 0;
            var countSec = 0;
            for (let i = 0; i < resHis.data.length; i++) {
              if (resHis.data[i].his_sec) {
                countSec++;
              } else {
                countFirst++;
              }
            }
            this.setData({
              numBookFirst: countFirst,
              numBookSec: countSec
            })
            // console.log("numBookFirst:", this.data.numBookFirst, ",numBookSec:", this.data.numBookSec);
          },
          fail: err => {
            console.error(err);
          }
        });
        // 查询可用二手数量
        //状态：0不可见，1初始，10为通过，11为不通过
        var usedBook = db.collection("tb_sec").where({
          sec_book_isbn: this.data.order_detail.order_book_isbn,
          sec_status: 10,
        }).count({
          success: res => {
            this.setData({
              usedBook: res.total
            })
            console.log("usedBook", this.data.usedBook);
          },
          fail: err => {
            console.log(err)
          }
        });
      },
      fail: err => {
        console.error(err);
      }
    });

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
   * 单个日期处理
   */
  changeDateSingle: function(str) {
    var date = new Date(str);
    date = date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate() + "    " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    return date;
  },

  /**
   * 手动侦听“逾期”选项改变状态
   */
  onChangeTime(event) {
    // 需要手动对 checked 状态进行更新
    this.setData({
      checked: event.detail
    });

  },

  /**
   * 更新按钮
   */
  btn_update(event) {
    console.log("this.data", this.data);
    // let createDate = (this.data.order_detail.order_create_date).toLocaleString()
    // this.setData({
    //   "order_detail.order_create_date": createDate
    // })
    if (this.data.order_detail.order_major == "" || this.data.order_detail.order_book_name == "" || this.data.order_detail.order_book_isbn == "" || this.data.order_detail.order_book_price == "" || this.data.order_detail.order_college == "" || this.data.order_detail.order_course == "" || this.data.order_detail.order_semester == "") {
      Dialog.alert({
        title: '提示',
        message: '星号为必填项'
      }).then(() => {
        // on close
      });
    } else {
      wx.cloud.callFunction({
        // 云函数名称
        name: 'dbUpdateOrder',
        // 传给云函数的参数
        data: this.data,
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
              db.collection("tb_order").doc(this.data.order_id).get({
                success: res => {
                  // console.log("tb_order:", res);
                  this.setData({
                    order_detail: res.data,
                    orderDetailCreateDate: (new Date(res.data.order_create_date)).toLocaleString(),
                    orderDetailUpdateDate: (new Date(res.data.order_update_date)).toLocaleString(),
                  });
                  if (res.data.order_timeout == true) {
                    this.setData({
                      checked: true
                    });
                  };
                  // console.log("tb_order detail", this.data.order_detail);
                  // 查询需要订书的表项
                  db.collection("tb_his").where({
                    his_grade: this.data.order_detail.order_grade,
                    his_book_isbn: this.data.order_detail.order_book_isbn,
                    his_college: this.data.order_detail.order_college,
                    his_major: this.data.order_detail.order_major,
                    his_first: true,
                  }).get({
                    success: resHis => {
                      console.log("tb_his", resHis.data);
                      var countFirst = 0;
                      var countSec = 0;
                      for (let i = 0; i < resHis.data.length; i++) {
                        if (resHis.data[i].his_sec) {
                          countSec++;
                        } else {
                          countFirst++;
                        }
                      }
                      this.setData({
                        numBookFirst: countFirst,
                        numBookSec: countSec
                      })
                      // console.log("numBookFirst:", this.data.numBookFirst, ",numBookSec:", this.data.numBookSec);
                    },
                    fail: err => {
                      console.error(err);
                    }
                  })
                },
                fail: err => {
                  console.error(err);
                }
              });
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
  },

  /**
   * 删除按钮
   */
  btn_delete(event) {
    wx.cloud.callFunction({
      name: "dbDelete",
      data: {
        dbName: "tb_order",
        _id: this.data.order_id
      },
      success: res => {
        console.log("btn_delete", res)
        let pages = getCurrentPages(); //当前页面
        let prevPage = pages[pages.length - 2]; //上一页面
        prevPage.setData({ //直接给上移页面赋值
          message: "delete",
          selAddress: 'yes'
        });
        Dialog.alert({
          title: '已删除',
          message: '正在返回上一页'
        }).then(() => {
          wx.navigateBack({ //返回
            delta: 1
          })
        });
      }
    })
  }
})