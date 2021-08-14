// pages/user/user.js
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeName: '1',
    username:"",
    userxingbie:"",
    userimg:"",
    useraddress:"",
    devimg:{
      mimo:"https://thirdwx.qlogo.cn/mmopen/vi_32/1lmunfsCnQcNrvnmnVOqXvWFe9ZE8uFcee29iadW76Eu6icErOjtXLUVvQnUNSYftzL7abPzTlTnW7FFxOlibxB5Q/132",
      lucy:"https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIajpVHJLBmpAEkfhMoyPhaa9YLb3ImicFiaFCRGlfhdDUUWFplcW6G1K0ZA5jTlX0RV3bxicTnXYZ7w/132",
      xiaolei:"https://thirdwx.qlogo.cn/mmopen/vi_32/lYyrDRCl8jQbwcsYp7TclibuyXlgic13JlhCBiaS0adxwxD1Hw4CDzthEG3rSIPYGIDqW5ALJd2YhrqicJhrB6Kj4g/132"
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  getuserinfo(){
    // 设置useropenid为全局变量  发布物品时候添加  和判断是否登录
    wx.cloud.callFunction({
      name:"getuserin",
      success:res=>{
      app.globalData.useropendid=res.result.openid  
      console.log(res.result.openid)
    }
    })
    wx.getUserProfile({
      lang: "zh_CN",
      desc:"补充用户信息",
      success:(res)=>{
        console.log(res)
        if(res.userInfo.gender==1){
          res.userInfo.gender="男"
        }else{
          res.userInfo.gender="女"
        }
        // console.log("头像地址 ："+res.userInfo.avatarUrl)

        // 设置全局变量供发帖使用
        app.globalData.username=res.userInfo.nickName
        app.globalData.userxingbie=res.userInfo.gender
        app.globalData.userimg=res.userInfo.avatarUrl

        

        this.setData({
          userimg:res.userInfo.avatarUrl,
          username:res.userInfo.nickName,
          userxingbie:res.userInfo.gender,
          useraddress:res.userInfo.province+"  "+res.userInfo.city
          
        })
        
      }
    })
  },

  onChange(event) {
    this.setData({
      activeName: event.detail,
    });
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