
var tempFilePaths
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

    imglist:[],
    name:"",
    fileList: [],
  },
  // 删除图片
  del(res){
      // console.log(res)
      const index=res.detail.index
      var oldlist=this.data.fileList
      oldlist.splice(index,1)
      this.setData({
        fileList:oldlist
      })
      console.log("删除图片成功",this.data.fileList)
  },
  // 当图片内容发生变化后  reset
  afterRead(res){
      console.log(res)
  },

imgsrc(res){
    console.log(res.detail.file)
    var len=res.detail.file.length
    var newlist=this.data.fileList

    for(var i=0;i<len;i++){
      newlist.push({url:res.detail.file[i].url})
    }
    this.setData({
      fileList:newlist
    })
    console.log("添加图片成功",this.data.fileList)
},

  addimgs(){
    var tempFilePaths=[];
    var imglist=this.data.fileList

    var long=imglist.length
    for(var j=0;j<long;j++){
      tempFilePaths.push(imglist[j].url)
    }

    console.log("tempFilePaths",tempFilePaths)
    const filepath=tempFilePaths
    var len=filepath.length
    for(var i=0;i<len;i++)
    {
        console.log(filepath[i])
        wx.cloud.uploadFile({
          cloudPath: String(Date.now())+".png",
          filePath: filepath[i], 
          success: res => {
            console.log("xxx")
            console.log(res.fileID)
            console.log(this.data.appid)
            var addlist=this.data.imglist
            var newlist=addlist.concat(res.fileID)
            this.setData({
              imglist:newlist
            })
            console.log("imglist")
            console.log(this.data.imglist.length)
            wx.showLoading({
              title: '上传中！'+String(i),
            })
            setTimeout(function () {
              wx.hideLoading()
            }, 2000)
          },
          fail: err => {
            console.log(err)
          }
      })
    }
      

    setTimeout(function () {
      wx.hideLoading()
    }, 2000)
  },






























  getUserProfile(res){
    wx.getUserProfile({
      desc:"用于完善用户资料",
      success:(res)=>{
        console.log(res.userInfo)
        this.setData({
              name:res.userInfo.nickName,
              image:res.userInfo.avatarUrl
        })
      }
    })
  },

  // 获取openid成功

  getopenip(){
    wx.cloud.callFunction({
      name:"getuserin",
      success(res){
        console.log(res.result.openid)
      }
    })
  },

//添加图片
  addimg(){
    var tempFilePaths;

    wx.chooseImage({
      count: 9,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success:(res) =>{
        tempFilePaths=res.tempFilePaths
        // console.log(tempFilePaths)
        const filepath=tempFilePaths
        var len=filepath.length
        for(var i=0;i<len;i++)
        {
            console.log(filepath[i])
            wx.cloud.uploadFile({
              cloudPath: String(Date.now())+".png",
              filePath: filepath[i], 
              success: res => {
                // console.log("xxx")
                // console.log(res.fileID)
                // console.log(this.data.appid)
                console.log(res)
                var addlist=this.data.imglist
                var newlist=addlist.concat(res.fileID)
                this.setData({
                  imglist:newlist
                })
                wx.showLoading({
                  title: '加载中',
                })
                setTimeout(function () {
                  wx.hideLoading()
                }, 2000)
                
                
                // wx.hideLoading(200)
                // console.log("imglist")
                // console.log(this.data.imglist.length)
              },
              fail: err => {
                console.log(err)
              }
          })
        }
      }
    })
  },
  getappdata(){

      // var app=getApp()
      // app.globalData.infor="123"
      console.log(app.globalData.infor)
  },








  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var app=getApp();
      console.log(app.globalData)
      
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