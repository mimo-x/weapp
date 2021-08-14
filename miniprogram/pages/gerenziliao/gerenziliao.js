// pages/gerenziliao/gerenziliao.js

var db=wx.cloud.database()

Page({

  /**
   * 页面的初始数据
   */
  data: {
        userimg:"https://636c-cloud1-3g7acgwi0d030e56-1305353622.tcb.qcloud.la/1620994519866.png?sign=5c2a1e0a48ee014176370d377422ed87&t=1621006835",
        username:"13425436575",
        qq:"12435436",
        userxingbie:"213",
        goodsinf:"213",
        goodsimgurl:[],
        time:""

  },
  preview(event) {
    console.log(event.currentTarget.dataset.src)
    let currentUrl = event.currentTarget.dataset.src
    wx.previewImage({
      current: currentUrl, // 当前显示图片的http链接
      urls: this.data.goodsimgurl, // 需要预览的图片http链接列表
      fail(err){
        console.log(err)
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

          var str = options.detail;
      
          var detail = str.split("|");
          var urllist=detail[5].split(",")

          this.setData({
      
              username:detail[0],
              userimg:detail[1],
              qq:detail[2],
              userxingbie:detail[3],
              goodsinf:detail[4],
              goodsimgurl:urllist,
              time:detail[6]
          })
  

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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})