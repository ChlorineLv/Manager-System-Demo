// miniprogram/pages/page_admin_book/page_admin_book.js
const db = wx.cloud.database()
import Dialog from '../../miniprogram_npm/vant-weapp/dialog/dialog';
const citys = {
  '浙江': ['杭州', '宁波', '温州', '嘉兴', '湖州'],
  '福建': ['福州', '厦门', '莆田', '三明', '泉州']
};
Page({

  /**
   * 页面的初始数据
   */
  data: {
    columns: [{
        values: Object.keys(citys),
        className: 'column1'
      },
      {
        values: citys['浙江'],
        className: 'column2',
        defaultIndex: 2
      }
    ]
  },

  /**
   * 学院选择
   */
  onChange(event) {
    const {
      picker,
      value,
      index
    } = event.detail;
    picker.setColumnValues(1, citys[value[0]]);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log("教务员预定发布页面");
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
   * 确定发布
   */
  formSubmit: function(e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value);
    let dataInput = e.detail.value;
    wx.cloud.callFunction({
      // 云函数名称
      name: 'dbReleaseOrder',
      // 传给云函数的参数
      data: dataInput,
      success(res) {
        console.log("callFunction dbReleaseOrder result:", res.result)
        if (res.result != null) {
          Dialog.confirm({
            title: '成功',
            message: '已成功发布，单号为' + res.result._id + '，是否返回上一页'
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
        console.error("callFunction dbReleaseOrder err:", err)
      }
    });
  
  }
})