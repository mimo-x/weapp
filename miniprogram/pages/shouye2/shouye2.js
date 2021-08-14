// pages/shouye2/shouye2.js
const db=wx.cloud.database();
Page({
  
  /**
   * 页面的初始数据
   */
  data: {
      daohang:["寻物","小心动","小讨论","小闲置"],
      scrolls:["寻物","小心动","小讨论","小闲置"],
      idx: 0,
      datalist:[]
      

  },
  // 获取当前index
  goIndex (e) {
    this.setData({
      idx:e.currentTarget.dataset.index,
    })
 },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.gettiezi()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // 切换页面刷新数据  取消减少 数据库操作量
    // this.setData({
    //   datalist:[]
    // })
    // var page=this.data.datalist.length
    // this.gettiezi(5,page)
    // wx.stopPullDownRefresh()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    wx.showLoading({
      title: "数据重新加载中",
      // icon:"success"
    })
    setTimeout(function () {
      wx.hideLoading()
    }, 2000)
      this.setData({
        datalist:[]
      })
      var page=this.data.datalist.length
      this.gettiezi(5,page)
      wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  gettiezi(num=20,page=0){
      wx.cloud.callFunction({
        name:"gettiezi",
        data:{
          num:num,
          page:page
        },
      }).then(res=>{
        var oldlist=this.data.datalist;
        var newdata=oldlist.concat(res.result.data)
        // console.log(res)
        this.setData({
          datalist:newdata
        })
      })
  },
  // 当接触到底部时候刷新补充列表
  touchEndRefresh(){
    wx.showLoading({
      title: "🚀补充数据",
      // icon:"success"
    })
    setTimeout(function () {
      wx.hideLoading()
    }, 1000)
    var page=this.data.datalist.length
      this.gettiezi(20,page)
    
  },
  onReachBottom: function () {
    // wx.showLoading({
    //   title: "🚀补充数据",
    //   // icon:"success"
    // })
    // setTimeout(function () {
    //   wx.hideLoading()
    // }, 2000)
    // var page=this.data.datalist.length
    //   this.gettiezi(5,page)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },




  // 搜索功能
  navigateTo(){
    console.log("跳转")
    wx.navigateTo({
      url: '/pages/search/search'
    })
  },


// 往二级帖子详情页面传数据
    detail:function(e){
 
    var username = e.currentTarget.dataset.username;
    var userxingbie = e.currentTarget.dataset.userxingbie
    var userimg = e.currentTarget.dataset.userimg
    var qq = e.currentTarget.dataset.qq
    var goodsinf = e.currentTarget.dataset.goodsinf
    var pretime=e.currentTarget.dataset.pretime
    
    // 此处链接传到后端出现bug
    var goodsimgurl = e.currentTarget.dataset.goodsimgurl
    
    var time = e.currentTarget.dataset.time;
    wx.navigateTo({
 
        url: "/pages/gerenziliao/gerenziliao?detail=" + username + "|" + userimg+"|"+qq+"|"+userxingbie+"|"+goodsinf+"|"+goodsimgurl+"|"+pretime
    })
 
}
  


})




