// miniprogram/pages/page_admin/page_admin.js
import Notify from '../../miniprogram_npm/vant-weapp/notify/notify';
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeNamesBookSelect: [],
    activeNamesBookMgmt: ["1"],
    activeNamesSec: [],
    activeNamesRec: [],
    order_list: [],
    user_list: [],
    secCheck_list: [],
    sec_list: [],
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
   * 点击右边注销
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
   * button预订查询
   */
  btn_search(options) {
    db.collection('tb_order').where({
      order_visible: true
    }).get({
      success: res => {
        // console.log("查询结果",res.data);
        this.setData({
          order_list: res.data,
        });
      },
      fail: err => {
        console.error(err);
      }
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
        success:res => {
          this.setData({
            secCheck_list: res.data
          })
        },
        fail:err=>{
          console.log(err)
        }
      })
    };
    if(this.data.activeNamesSec.indexOf("2") != -1) {
      db.collection("tb_sec").where({
        sec_status: db.command.neq(1)
      }).get({
        success:res=>{
          this.setData({
            sec_list: res.data
          })
        },
        fail:err=>{
          console.log(err)
        }
      })
    }
  },

  /**
   * button二手详情
   */
  viewItemsecCheck:function(event){
    var id = event.currentTarget.id;
    wx.navigateTo({
      url: '../page_admin_sec_detail/page_admin_sec_detail?_id=' + id,
    })
  },

  /**
   * button审核历史详情
   */
  viewItemSecCheck:function(event){

  },

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
            recCheck_list: res.data
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
          console.log(res)
          this.setData({
            rec_list: res.data
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