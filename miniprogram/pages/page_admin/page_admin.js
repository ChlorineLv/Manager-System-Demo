// miniprogram/pages/page_admin/page_admin.js
import Notify from '../../miniprogram_npm/vant-weapp/notify/notify';
import Toast from '../../miniprogram_npm/vant-weapp/toast/toast';
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user_list: [],
    multiArray: [
      ["无", "计算机科学与工程学院", "机械与汽车工程学院", "自动化"],
      ["无", ]
    ],
    multiIndex: [0, 0],
    arraySemester: ["无", "大一上", "大一下", "大二上", "大二下", "大三上", "大三下", "大四上", "大四下"],
    arrayStatus: ["无", "已截止", "未截止"],
    startGrade: (new Date().getFullYear()).toString(),
    indexSemester: 0,
    indexStatus: 0,
    filterCollege: "无",
    filterMajor: "无",
    filterGrade: "无",
    filterSemester: "无",
    filterStatus: "无",
    arrayPageIndex: ["1"],
    indexPageIndex: 0,
    arrayPageSize: [3, 5, 10, 15],
    indexPageSize: 1,
    activeNamesBookSelect: [],
    activeNamesBookMgmt: ["1"],
    boolHaveSearch: false,
    pageIndex: 1,
    pageSize: 10,
    orderListLength: 0,
    orderListTotalPage: 0,
    orderListHasMore: false,
    order_list: [],
    activeNamesSec: [],
    secCheck_list: [],
    multiArraySec: [
      ["无", "计算机科学与工程学院", "机械与汽车工程学院", "自动化"],
      ["无", ]
    ],
    multiIndexSec: [0, 0],
    arraySemesterSec: ["无", "大一上", "大一下", "大二上", "大二下", "大三上", "大三下", "大四上", "大四下"],
    arrayStatusSec: ["无", "待审核","通过", "不通过"],
    startGradeSec: (new Date().getFullYear()).toString(),
    indexSemesterSec: 0,
    indexStatusSec: 0,
    filterCollegeSec: "无",
    filterMajorSec: "无",
    filterGradeSec: "无",
    filterSemesterSec: "无",
    filterStatusSec: "无",
    arrayPageIndexSec: ["1"],
    indexPageIndexSec: 0,
    arrayPageSizeSec: [3, 5, 10, 15],
    indexPageSizeSec: 1,
    boolHaveSearch: false,
    pageIndexSec: 1,
    pageSizeSec: 10,
    secListLength: 0,
    secListTotalPage: 0,
    secListHasMore: false,
    sec_list: [],
    activeNamesRec: [],
    recCheck_list: [],
    rec_list: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log("教务员界面", options);
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
      order_list: [],
      recCheck_list: [],
      activeNamesRec: [],
      activeNamesSec: [],
      boolHaveSearch: false,
    });
    Toast.clear();
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
  onClickRight() {
    wx.navigateBack({
      delta: 1
    })
  },

  /**
   * tab栏切换
   */
  onChangeTab(event) {
    // console.log("点击了", event)
    // 点击了设置tab
    if (event.detail.index == 3) {
      db.collection("tb_user").get({
        success: res => {
          this.setData({
            user_list: res.data
          })
          // console.log("tb_user",res.data);
        }
      })
    }
  },

  /*********************************************
   * 
   * Tab 预订教材
   * 
   *********************************************/

  /**
   * button教材预订发布
   */
  btn_book() {
    wx.navigateTo({
      url: '../page_admin_book/page_admin_book',
    })
  },

  /**
   * collapse教材预订历史
   */
  onChangeCollapseBookMgmt(event) {
    this.setData({
      activeNamesBookMgmt: event.detail
    });
  },

  /**
   * collapse点开筛选查询
   */
  onChangeCollapseBookSelect(event) {
    this.setData({
      activeNamesBookSelect: event.detail
    });
  },

  /**
   * picker选择年级Grade
   */
  bindMultiPickerChange: function(e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      multiIndex: e.detail.value,
      filterCollege: this.data.multiArray[0][e.detail.value[0]],
      filterMajor: this.data.multiArray[1][e.detail.value[1]]
    })
  },

  /**
   * picker改变第一列后的变化
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
        data.multiArray[1] = ["无"];
        break;
      case 1:
        data.multiArray[1] = ["计算机科学与技术", "计算机全英联合", "计算机全英创新", "网络工程", "信息安全", ];
        break;
      case 2:
        data.multiArray[1] = ["机械工程"];
        break;
      case 3:
        data.multiArray[1] = ["自动化"];
        break;
    }
    this.setData(data);
  },

  /**
   * picker填写年级
   */
  bindDateChange: function(e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      filterGrade: e.detail.value
    })
  },

  /**
   * picker填写学期
   */
  bindPickerChange: function(e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      indexSemester: e.detail.value,
      filterSemester: this.data.arraySemester[e.detail.value]
    })
  },

  /**
   * picker填写是否截止
   */
  bindStatusChange: function(e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      indexStatus: e.detail.value,
      filterStatus: this.data.arrayStatus[e.detail.value]
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
   * picker选择页码
   */
  bindPageIndexPickerChange: function(e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      indexPageIndex: e.detail.value,
      pageIndex: this.data.arrayPageIndex[e.detail.value]
    })
    this.filterSearch();
  },

  /**
   * picker选择页面大小
   */
  bindPageSizePickerChange: function(e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      indexPageSize: e.detail.value,
      pageSize: this.data.arrayPageSize[e.detail.value]
    })
    this.filterSearch();
  },

  /**
   * pagination下一页 
   */
  paginationNextPage: function(e) {
    let i = this.data.pageIndex;
    this.setData({
      pageIndex: i + 1
    });
    this.filterSearch();
  },

  /**
   * pagination上一页
   */
  paginationPreviousPage: function(e) {
    let i = this.data.pageIndex;
    this.setData({
      pageIndex: i - 1
    });
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
    let filterStatus = false;
    if (this.data.filterStatus == "已截止") {
      filterStatus = true;
    } else if (this.data.filterStatus == "未截止") {
      filterStatus = false;
    } else {
      filterStatus = null;
    }
    wx.cloud.callFunction({
      name: "dbRead",
      data: {
        dbName: "tb_order",
        pageIndex: this.data.pageIndex,
        pageSize: this.data.pageSize,
        filter: {
          order_college: (this.data.filterCollege == "无" ? null : this.data.filterCollege),
          order_major: (this.data.filterMajor == "无" ? null : this.data.filterMajor),
          order_grade: (this.data.filterGrade == "无" ? null : parseInt(this.data.filterGrade)),
          order_semester: (this.data.filterSemester == "无" ? null : this.data.filterSemester),
          order_timeout: filterStatus,
        }
      }
    }).then(res => {
      console.log("dbRead callFunction:", res.result);
      this.setData({
        order_list: this.changeOrderCreateDate(res.result.data),
        boolHaveSearch: true,
        orderListTotalPage: res.result.totalPage,
        orderListLength: res.result.total,
        orderListHasMore: res.result.hasMore,
      });
      let tempArr = [];
      for (let i = 0; i < res.result.totalPage; i++) {
        tempArr[i] = i + 1;
      };
      this.setData({
        arrayPageIndex: tempArr,
      });
      Toast.clear();
    })
  },

  /**
   * button预订详情，将ID传过去
   */
  viewItem: function(event) {
    var id = event.currentTarget.id;
    wx.navigateTo({
      url: '../page_admin_book_detail/page_admin_book_detail?_id=' + id,
    })
  },

  /*********************************************
   * 
   * Tab 二手教材
   * 
   *********************************************/

  /**
   * Collapse二手教材
   */
  onChangeCollapseSec: function(event) {
    this.setData({
      activeNamesSec: event.detail
    });
    if (this.data.activeNamesSec.indexOf("1") != -1) {
      db.collection("tb_sec").where({
        sec_status: 1
      }).get({
        success: res => {
          this.setData({
            secCheck_list: this.changeSecCreateDate(res.data)
          })
        },
        fail: err => {
          console.log(err)
        }
      })
    };
    if (this.data.activeNamesSec.indexOf("2") != -1) {
      // db.collection("tb_sec").where({
      //   sec_status: db.command.neq(1)
      // }).get({
      //   success: res => {
      //     this.setData({
      //       sec_list: this.changeSecCreateDate(res.data)
      //     })
      //   },
      //   fail: err => {
      //     console.log(err)
      //   }
      // })
    }
  },

  /**
   * picker选择年级Grade
   */
  bindMultiPickerChangeSec: function(e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      multiIndexSec: e.detail.value,
      filterCollegeSec: this.data.multiArraySec[0][e.detail.value[0]],
      filterMajorSec: this.data.multiArraySec[1][e.detail.value[1]]
    })
  },

  /**
   * picker改变第一列后的变化
   */
  bindMultiPickerColumnChangeSec: function(e) {
    // console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    var data = {
      multiArraySec: this.data.multiArraySec,
      multiIndexSec: this.data.multiIndexSec
    };
    data.multiIndexSec[e.detail.column] = e.detail.value;
    // 第一列的变化导致第二列内容的变化：各学院的各专业
    switch (data.multiIndexSec[0]) {
      case 0:
        data.multiArraySec[1] = ["无"];
        break;
      case 1:
        data.multiArraySec[1] = ["计算机科学与技术", "计算机全英联合", "计算机全英创新", "网络工程", "信息安全", ];
        break;
      case 2:
        data.multiArraySec[1] = ["机械工程"];
        break;
      case 3:
        data.multiArraySec[1] = ["自动化"];
        break;
    }
    this.setData(data);
  },

  /**
   * picker填写年级
   */
  bindDateChangeSecSec: function(e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      filterGradeSec: e.detail.value
    })
  },

  /**
   * picker填写学期
   */
  bindPickerChangeSec: function(e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      indexSemesterSec: e.detail.value,
      filterSemesterSec: this.data.arraySemesterSec[e.detail.value]
    })
  },

  /**
   * picker填写是否截止
   */
  bindStatusChangeSec: function(e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      indexStatusSec: e.detail.value,
      filterStatusSec: this.data.arrayStatusSec[e.detail.value]
    })
  },

  /**
   * button二手查询
   */
  btn_searchSec(options) {
    this.setData({
      pageIndexSec: 1,
      pageSizeSec: 5
    })
    this.filterSearchSec();
  },

  /**
   * picker选择页码
   */
  bindPageIndexPickerChangeSec: function(e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      indexPageIndexSec: e.detail.value,
      pageIndexSec: this.data.arrayPageIndexSec[e.detail.value]
    })
    this.filterSearchSec();
  },

  /**
   * picker选择页面大小
   */
  bindPageSizePickerChangeSec: function(e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      indexPageSizeSec: e.detail.value,
      pageSizeSec: this.data.arrayPageSizeSec[e.detail.value]
    })
    this.filterSearchSec();
  },

  /**
   * pagination下一页 
   */
  paginationNextPageSec: function(e) {
    let i = this.data.pageIndexSec;
    this.setData({
      pageIndexSec: i + 1
    });
    this.filterSearchSec();
  },

  /**
   * pagination上一页
   */
  paginationPreviousPageSec: function(e) {
    let i = this.data.pageIndexSec;
    this.setData({
      pageIndexSec: i - 1
    });
    this.filterSearchSec();
  },

  /**
   * button二手详情
   */
  viewItemsecCheckSec: function(event) {
    var id = event.currentTarget.id;
    wx.navigateTo({
      url: '../page_admin_sec_detail/page_admin_sec_detail?_id=' + id,
    })
  },

  /**
   * button审核历史详情
   */
  viewItemSecCheck: function(event) {
    var id = event.currentTarget.id;
    wx.navigateTo({
      url: '../page_admin_sec_detail/page_admin_sec_detail?_id=' + id,
    })
  },



  /**
   * filter-search筛选函数
   */
  filterSearchSec: function() {
    Toast.loading({
      duration: 0,
      mask: true,
      message: '加载中...'
    });
    //状态：0不可见，1初始，10为通过，11为不通过
    let filterStatusSec = "无";
    if (this.data.filterStatusSec == "通过") {
      filterStatusSec = 10;
    } else if (this.data.filterStatusSec == "不通过") {
      filterStatusSec = 11;
    } else if (this.data.filterStatusSec == "待审核") {
      filterStatusSec = 1;
    }
    wx.cloud.callFunction({
      name: "dbRead",
      data: {
        dbName: "tb_sec",
        pageIndex: this.data.pageIndexSec,
        pageSize: this.data.pageSizeSec,
        filter: {
          sec_college: (this.data.filterCollegeSec == "无" ? null : this.data.filterCollegeSec),
          sec_major: (this.data.filterMajorSec == "无" ? null : this.data.filterMajorSec),
          sec_grade: (this.data.filterGradeSec == "无" ? null : parseInt(this.data.filterGradeSec)),
          sec_semester: (this.data.filterSemesterSec == "无" ? null : this.data.filterSemesterSec),
          sec_status: (this.data.filterStatusSec == "无" ? null : this.data.filterStatusSec),
        }
      }
    }).then(res => {
      console.log("dbRead callFunction:", res.result);
      this.setData({
        sec_list: this.changeSecCreateDate(res.result.data),
        boolHaveSearchSec: true,
        secListTotalPage: res.result.totalPage,
        secListLength: res.result.total,
        secListHasMore: res.result.hasMore,
      });
      let tempArr = [];
      for (let i = 0; i < res.result.totalPage; i++) {
        tempArr[i] = i + 1;
      };
      this.setData({
        arrayPageIndexSec: tempArr,
      });
      Toast.clear();
    })
  },

  /*********************************************
   * 
   * Tab 书目推荐
   * 
   *********************************************/

  /**
   * Collapse推荐栏
   */
  onChangeCollapseRec: function(event) {
    this.setData({
      activeNamesRec: event.detail
    });
    if (this.data.activeNamesRec.indexOf("1") != -1) {
      db.collection("tb_rec").where({
        rec_status: 1
      }).get({
        success: res => {
          // console.log(res)
          this.setData({
            recCheck_list: this.changeRecCreateDate(res.data),
          })
        },
        fail: err => {
          console.log("tb_rec", err);
        }
      })
    };
    if (this.data.activeNamesRec.indexOf("2") != -1) {
      db.collection("tb_rec").where({
        rec_status: db.command.neq(1)
      }).get({
        success: res => {
          // console.log(res)
          this.setData({
            rec_list: this.changeRecCreateDate(res.data)
          })
        },
        fail: err => {
          console.log("tb_rec", err);
        }
      })
    };
  },

  /**
   * button推荐审核传ID
   */
  viewItemRecCheck: function(event) {
    var id = event.currentTarget.id;
    wx.navigateTo({
      url: '../page_admin_rec_detail/page_admin_rec_detail?_id=' + id,
    })
  }
})