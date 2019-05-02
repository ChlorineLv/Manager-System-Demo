// miniprogram/pages/page_student/page_stu.js
import Dialog from '../../miniprogram_npm/vant-weapp/dialog/dialog';
import Toast from '../../miniprogram_npm/vant-weapp/toast/toast';
const db = wx.cloud.database();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    stu_id: 0,
    urlRec: "",
    urlSec: "",
    activeNamesBook: [],
    activeNamesBookRec: [],
    activeNamesBookSec: [],
    activeNamesBookSearchResult: ["1", "2"],
    user_detail: [],
    order_list: [],
    rec_list: [],
    sec_list: [],
    multiBookSearchArray: [
      ["计算机科学与工程学院", "机械与汽车工程学院", "自动化"],
      ["计算机科学与技术", "计算机全英联合", "计算机全英创新", "网络工程", "信息安全", ]
    ],
    multiBookSearchIndex: [0, 0],
    arrayBookSearchSemester: ["大一上", "大一下", "大二上", "大二下", "大三上", "大三下", "大四上", "大四下"],
    startBookSearchGrade: (new Date().getFullYear()).toString(),
    indexBookSearchSemester: 0,
    indexBookSearchStatus: 0,
    filterBookSearchCollege: "计算机科学与工程学院",
    filterBookSearchMajor: "网络工程",
    filterBookSearchGrade: "2015",
    filterBookSearchSemester: "大一上",
    arrayPageIndex: ["1"],
    indexPageIndex: 0,
    arrayPageSize: [3, 5, 10, 15],
    indexPageSize: 1,
    boolHaveSearch: false,
    orderBookSearch_list: [],
    orderBookSearchListTotalPage: [],
    orderBookSearchListLength: [],
    orderBookSearchListHasMore: [],
    recBookSearch_list: [],
    recBookSearchListTotalPage: [],
    recBookSearchListLength: [],
    recBookSearchListHasMore: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      stu_id: parseInt(options.user_id),
      urlRec: "../page_student_rec/page_student_rec?_id=" + options.user_id,
      urlSec: "../page_student_sec/page_student_sec?_id=" + options.user_id,
    });
    console.log("学生界面，stu_id:", this.data.stu_id);
    db.collection('tb_user').where({
      user_id: this.data.stu_id // 填入当前用户 openid
    }).get({
      success: res => {
        this.setData({
          user_detail: res.data[0]
        });
        // console.log("user_detail", this.data.user_detail);

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
    this.setData({
      activeNamesBook: [],
      activeNamesBookRec: [],
      activeNamesBookSec: [],
    })
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
   * sec_create_date日期处理
   */
  changeSecCreateDate: function(arr) {
    for (let i = 0; i < arr.length; i++) {
      let date = new Date(arr[i].sec_create_date);
      arr[i].sec_create_date = date.toLocaleString();
    }
    return arr;
  },

  /**
   * his_create_date日期处理
   */
  changeHisUpdateDate: function(arr) {
    for (let i = 0; i < arr.length; i++) {
      let date = new Date(arr[i].his_update_date);
      arr[i].his_update_date = date.toLocaleString();
    }
    return arr;
  },

  /**
   * rec_create_date日期处理
   */
  changeRecCreateDate: function(arr) {
    for (let i = 0; i < arr.length; i++) {
      let date = new Date(arr[i].rec_create_date);
      arr[i].rec_create_date = date.toLocaleString();
    }
    return arr;
  },

  /**
   * order_create_date日期处理
   */
  changeOrderCreateDate: function(arr) {
    for (let i = 0; i < arr.length; i++) {
      let date = new Date(arr[i].order_create_date);
      arr[i].order_create_date = date.toLocaleString();
    }
    return arr;
  },

  /**
   * 右边注销
   */
  onClickRight: function() {
    wx.navigateBack({
      delta: 1
    })
  },

  /**
   * tab栏
   */
  onChangeTab: function(event) {
    // console.log("点击了", event)
    // this.setData({
    //   activeNamesBook: [],
    //   activeNamesBookRec: [],
    //   activeNamesBookSec: [],
    // })
  },

  /*********************************************
   * 
   * Tab 预订教材
   * 
   *********************************************/

  /**
   * 教材预订Collapse栏目
   */
  onChangeCollapseBook: function(event) {
    this.setData({
      activeNamesBook: event.detail
    });
    if (this.data.activeNamesBook.indexOf("1") != -1) {
      db.collection('tb_order').where({
        order_visible: true,
        order_timeout: false,
        order_grade: this.data.user_detail.user_grade,
        order_college: this.data.user_detail.user_college,
        order_major: this.data.user_detail.user_major,
      }).get({
        success: res => {
          // console.log(res.data);
          this.setData({
            order_list: this.changeOrderCreateDate(res.data),
          });
          // console.log("order_list", this.data.order_list);
        },
        fail: err => {
          console.error(err);
        }
      });
    }
    if (this.data.activeNamesBook.indexOf("2") != -1) {
      db.collection('tb_his').where({
        his_grade: this.data.user_detail.user_grade,
        his_college: this.data.user_detail.user_college,
        his_major: this.data.user_detail.user_major,
        his_stu_id: this.data.stu_id
      }).get({
        success: res => {
          // console.log("tb_his",res.data);
          for (let i = 0; i < res.data.length; i++) {
            db.collection("tb_order").doc(res.data[i].his_order_id).get({
              success: resOrder => {
                // console.log(res.data)
                res.data[i].his_order_timeout = resOrder.data.order_timeout;
                let date = (new Date(res.data[i].his_update_date)).toLocaleString();
                res.data[i].his_update_date = date;
                // 必须在db成功后再setData否则同步流导致内容没有变化
                this.setData({
                  his_list: res.data,
                });
              },
              fail: errOrder => {
                console.log(errOrder)
              }
            })
          };
        },
        fail: err => {
          console.error(err);
        }
      })
    }
  },

  /**
   * 预订教材详情，将ID传过去
   */
  viewItemOrder: function(event) {
    let id = event.currentTarget.id;
    wx.navigateTo({
      url: '../page_student_book/page_student_book?book_id=' + id + "&stu_id=" + this.data.stu_id,
    })
  },

  /**
   * 预订历史，将ID传过去
   */
  viewItemHis: function(event) {
    let id = event.currentTarget.id;
    // console.log(event);
    wx.navigateTo({
      url: '../page_student_book_his/page_student_book_his?_id=' + id,
    })
  },

  /*********************************************
   * 
   * Tab 二手教材
   * 
   *********************************************/

  /**
   * 二手申请历史栏目
   */
  onChangeCollapseBookSec: function(event) {
    this.setData({
      activeNamesBookSec: event.detail
    });
    if (this.data.activeNamesBookSec.indexOf("1") != -1) {
      // console.log("推荐历史", event);
      db.collection("tb_sec").where({
        sec_stu_id: this.data.stu_id,
      }).get({
        success: res => {
          // console.log("tb_sec", res);
          this.setData({
            sec_list: this.changeSecCreateDate(res.data)
          })
        },
        fail: err => {
          console.log(err);
        }
      })
    }
  },

  /**
   * 二手申请的详情
   */
  viewItemSec: function(event) {
    let id = event.currentTarget.id;
    wx.navigateTo({
      url: '../page_student_sec_detail/page_student_sec_detail?_id=' + id,
    })
  },

  /*********************************************
   * 
   * Tab 跨专业查询
   * 
   *********************************************/

  /**
   * picker选择年级Grade
   */
  bindBookSearchMultiPickerChange: function(e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      multiBookSearchIndex: e.detail.value,
      filterBookSearchCollege: this.data.multiBookSearchArray[0][e.detail.value[0]],
      filterBookSearchMajor: this.data.multiBookSearchArray[1][e.detail.value[1]]
    })
  },

  /**
   * picker改变第一列后的变化
   */
  bindBookSearchMultiPickerColumnChange: function(e) {
    // console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    var data = {
      multiBookSearchArray: this.data.multiBookSearchArray,
      multiBookSearchIndex: this.data.multiBookSearchIndex
    };
    data.multiBookSearchIndex[e.detail.column] = e.detail.value;
    // 第一列的变化导致第二列内容的变化：各学院的各专业
    switch (data.multiBookSearchIndex[0]) {
      case 0:
        data.multiBookSearchArray[1] = ["计算机科学与技术", "计算机全英联合", "计算机全英创新", "网络工程", "信息安全", ];
        break;
      case 1:
        data.multiBookSearchArray[1] = ["机械工程"];
        break;
      case 2:
        data.multiBookSearchArray[1] = ["自动化"];
        break;
    }
    this.setData(data);
  },

  /**
   * picker填写年级
   */
  bindBookSearchDateChange: function(e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      filterBookSearchGrade: e.detail.value
    })
  },

  /**
   * picker填写学期
   */
  bindBookSearchPickerChange: function(e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      indexBookSearchSemester: e.detail.value,
      filterBookSearchSemester: this.data.arrayBookSearchSemester[e.detail.value]
    })
  },

  /**
   * button预订查询
   */
  btn_search(options) {
    this.setData({
      pageIndex: 1,
      pageSize: 5
    })
    this.filterSearch();
  },

  /**
   * filter-search筛选函数
   */
  filterSearch: function() {
    Toast.loading({
      duration: 0,
      mask: true,
      message: '加载中...'
    });
    // tb_order的查询
    wx.cloud.callFunction({
      name: "dbRead",
      data: {
        dbName: "tb_order",
        pageIndex: this.data.pageIndex,
        pageSize: this.data.pageSize,
        filter: {
          order_college: this.data.filterBookSearchCollege,
          order_major: this.data.filterBookSearchMajor,
          order_grade: parseInt(this.data.filterBookSearchGrade),
          order_semester: this.data.filterBookSearchSemester,
        }
      }
    }).then(res => {
      console.log("dbRead callFunction:", res.result);
      this.setData({
        orderBookSearch_list: this.changeOrderCreateDate(res.result.data),
        boolHaveSearch: true,
        orderBookSearchListTotalPage: res.result.totalPage,
        orderBookSearchListLength: res.result.total,
        orderBookSearchListHasMore: res.result.hasMore,
      });
      Toast.clear();
    })

    // tb_rec的查询
    wx.cloud.callFunction({
      name: "dbRead",
      data: {
        dbName: "tb_rec",
        pageIndex: this.data.pageIndex,
        pageSize: this.data.pageSize,
        filter: {
          rec_college: this.data.filterBookSearchCollege,
          rec_major: this.data.filterBookSearchMajor,
          rec_grade: parseInt(this.data.filterBookSearchGrade),
          rec_semester: this.data.filterBookSearchSemester,
          // 状态：0不可见，1初始，10为通过，11为不通过
          rec_status: 10
        }
      }
    }).then(res => {
      console.log("dbRead callFunction:", res.result);
      this.setData({
        recBookSearch_list: this.changeRecCreateDate(res.result.data),
        boolHaveSearch: true,
        recBookSearchListTotalPage: res.result.totalPage,
        recBookSearchListLength: res.result.total,
        recBookSearchListHasMore: res.result.hasMore,
      });
      Toast.clear();
    })
  },

  /*********************************************
   * 
   * Tab 推荐书目申请
   * 
   *********************************************/

  /**
   * 推荐历史栏目
   */
  onChangeCollapseBookRec: function(event) {
    this.setData({
      activeNamesBookRec: event.detail
    });
    if (this.data.activeNamesBookRec.indexOf("1") != -1) {
      // console.log("推荐历史", event);
      db.collection("tb_rec").where({
        rec_stu_id: this.data.stu_id,
      }).get({
        success: res => {
          // console.log("tb_rec", res);
          this.setData({
            rec_list: this.changeRecCreateDate(res.data)
          })
        },
        fail: err => {
          console.log(err);
        }
      })
    }
  },


  /**
   * 推荐历史的详情
   */
  viewItemRec: function(event) {
    let id = event.currentTarget.id;
    wx.navigateTo({
      url: '../page_student_rec_detail/page_student_rec_detail?_id=' + id,
    })
  },
})