// miniprogram/pages/page_admin_book/page_admin_book.js
const db = wx.cloud.database()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    order_college: '',
    order_major: '',
    order_grade: '',
    order_semester: '',
    order_course: '',
    order_teacher: '',
    order_book_name: '',
    order_book_isbn: '',
    order_book_writer: '',
    order_book_version: '',
    order_book_publisher: '',
    order_book_price: '',
    order_book_type: '',
    order_book_num: '',
    order_remark: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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
    wx.redirectTo({
      url: '../index/index'
    })
  },

  /**
   * 用户填写表格（虽然可以利用event.currentTarget.id可以获取自动获取id但不知道怎么自动赋值）
   */
  onChage_college(event) {
    this.data.order_college = event.detail;
  },
  onChage_major(event) {
    this.data.order_major = event.detail;
  },
  onChage_grade(event) {
    this.data.order_grade = event.detail;
  },
  onChage_semester(event) {
    this.data.order_semester = event.detail;
  },
  onChage_course(event) {
    this.data.order_course = event.detail;
  },
  onChage_teacher(event) {
    this.data.order_teacher = event.detail;
  },
  onChage_book_name(event) {
    this.data.order_book_name = event.detail;
  },
  onChage_book_isbn(event) {
    this.data.order_book_isbn = event.detail;
  },
  onChage_book_writer(event) {
    this.data.order_book_writer = event.detail;
  },
  onChage_book_version(event) {
    this.data.order_book_version = event.detail;
  },
  onChage_book_publisher(event) {
    this.data.order_book_publisher = event.detail;
  },
  onChage_book_price(event) {
    this.data.order_book_price = event.detail;
  },
  onChage_remark(event) {
    this.data.order_remark = event.detail;
  },

  /**
   * 确定发布
   */
  btn_release(event) {
    console.log(this.data);
    db.collection('tb_order').add({
      // data 字段表示需新增的 JSON 数据
      data: {
        order_create_date: new Date(),
        order_college: this.data.order_college,
        order_major: this.data.order_major,
        order_grade: this.data.order_grade,
        order_semester: this.data.order_semester,
        order_course: this.data.order_course,
        order_teacher: this.data.order_teacher,
        order_book_name: this.data.order_book_name,
        order_book_isbn: this.data.order_book_isbn,
        order_book_writer: this.data.order_book_writer,
        order_book_version: this.data.order_book_version,
        order_book_publisher: this.data.order_book_publisher,
        order_book_price: this.data.order_book_price,
        order_book_type: this.data.order_book_type,
        order_book_num: 0,
        order_remark: this.data.order_remark
      },
      success(res) {
        // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
        console.log(res)
      }
    })
  }
})