// pages/ceshi/ceshi.js
const db=wx.cloud.database();
var number
var app=getApp()


Page({

    /**
     * 页面的初始数据
     */
    data: {
        imgurl:"https://636c-cloud1-3g7acgwi0d030e56-1305353622.tcb.qcloud.la/1618492659033.png?sign=1ba053093753735d547301bfc3fc37d4&t=1620633032",
        leixing:"寻物启事",
        fileList:[],
        goodsname:"",
        imglists:[],
        pageview:0,
        flag:0,
        stopflag:0
    },



    addform1(res){

      // 用判断利用useropenid判断用户是否登录
    
    
        // console.log(app.globalData.useropendid)
            if(app.globalData.useropendid=="")
            {
              console.log("未登录")
              wx.showLoading({
                title: '请先登录',
              })
              setTimeout(function () {
                wx.hideLoading()
              }, 2000)
              return null;
              
            }
    
    // --------------------------------------------------------------------------------------------------------------------
        console.log("前端传回的数据",res)
    
        const time=res.detail.value.date
        const findpeoplename=res.detail.value.findpeoplename
        const findpeoplenumber=res.detail.value.findpeoplenumber
        const information=res.detail.value.information
        const goodsname=res.detail.value.name
        const qq=res.detail.value.qq
    
    
    
        const goodsimgurl=this.data.imglists

    
        // 如果是空名字就提示  防止恶意刷数据库存储
        if(goodsname=="")
        {
          wx.showLoading({
            title: '请填入物品名称',
          })
          setTimeout(function () {
            wx.hideLoading()
          }, 2000)
          return null;
        }
    
    
        // ----------------------------------------------------------------------------------------------------------
        // 添加图片进数据库
        // this.addimgs()
    
    // ---------------------------------------------------------------------------------------------------------------------
        //  添加寻物数据库
    
        db.collection("xunwu-database").where({
          isgoods:"xuxin"
        }).count().then(res => { 
        const number=res.total
        //表单提交后重置
        this.setData({
         goodsname:"",
         goodsdate:"",
         findpeoplename:"",
         findpeoplenumber:"",
         information:"",
         qq:"",
         fileList:[],
         imglists:[],
         stopflag:0
         
       })  
      //  添加物品进数据库
    
      //  格式化时间
        var time=new Date()
        var year=time.getFullYear(),month=time.getMonth()+1,day=time.getDate(),week=time.getDay(),hour=time.getHours(),min=time.getMinutes(),secondes=time.getSeconds()
        var fabutimesee=year.toString()+"年"+month+"月"+day+"日"+"-"+"星期"+week.toString()+"  "+hour.toString()+"时"+min+"分"+secondes+"秒"   
        // 简化发布时间
        var fabutimesee2=month+"/"+day+" "+hour.toString()+":"+min
        console.log(fabutimesee)
    
    
        db.collection("xunwu-database").add({
          data:{
            isgoods:"xuxin",
            time:time,
            fabutime:db.serverDate(),
            pretime:fabutimesee2,
            findpeoplename:findpeoplename,
            findpeoplenumber:findpeoplenumber,
            information:information,
            goodsname:goodsname,
            goodsimgurl:goodsimgurl,
            foodsid:number,
            useropendid:app.globalData.useropendid,
            username:app.globalData.username,
            userxingbie:app.globalData.userxingbie,
            userimg:app.globalData.userimg,
            qq:qq
          },success(res){
                console.log(res)
                // console.log(res.data.goodsid)
                console.log("添加数据库成功")
                wx.showLoading({
                  title: "帖子发布成功",
                  icon:"success"
                })
                setTimeout(function () {
                  wx.hideLoading()
                }, 2000)
          }
        })
        })
      },




    /**
     * 生命周期函数--监听页面加载
     */
    wanchengshuru(res){
        console.log(res)
    },
    yulan(){
        wx.previewImage({
            current: this.data.imgurl, // 当前显示图片的http链接
            urls: [this.data.imgurl,this.data.imgurl,this.data.imgurl] // 需要预览的图片http链接列表
          })
    },
    onLoad: function (options) {
        
    },

    // 图片加载与上传

    // 增加图片到列表{url:""}对象的形式
// 添加图片时候就生成cloud
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
    
      this.addimgs();
    },


    del(res){
      // console.log(res)
      const index=res.detail.index
      var oldprelist=this.data.fileList
      var olddblist=this.data.imglists
      oldprelist.splice(index,1)
      olddblist.splice(index,1)
      this.setData({
        fileList:oldprelist
      })
      console.log("删除展示图片成功",this.data.fileList)
      console.log("删除数据库图片成功",this.data.imglists)
  },

  addimgs(){
    var tempFilePaths=[];
    var fileList=this.data.fileList
    var long=fileList.length
  
    for(var j=0;j<long;j++){
      tempFilePaths.push(fileList[j].url)
    }
  
    console.log("这个是tempFilePaths",tempFilePaths)
    const filepath=tempFilePaths
    var len=filepath.length
    this.setData({
        stopflag:1
    })
  
    for(var i=0;i<len;i++)
    {
        console.log(filepath[i])
        wx.cloud.uploadFile({
          cloudPath: String(Date.now())+".png",
          filePath: filepath[i], 
          success: res => {
            console.log("xxx")
            console.log(res.fileID)
            // console.log(this.data.appid)
            var addlist=this.data.imglists
            var newlist=addlist.concat(res.fileID)
            this.setData({
              imglists:newlist,
              stopflag:1
            })
            console.log(this.data.imglists.length)
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


    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
      let that=this

      if(that.data.stopflag==0)
      {

        if(that.data.pageview==0 || that.data.flag==0)
        {
          wx.showActionSheet({
            itemList: ['我捡到东西啦😊', '我丢东西了😒'],
            itemColor:"#2E8B57",
            success (res) {
              that.setData({
                pageview:1
              })
              console.log(res.tapIndex)
              if(res.tapIndex==0){
                that.setData({
                    leixing:"招领启示",
                })
                console.log("招领启示")
              }else{
                that.setData({
                  leixing:"寻物启示",
              })
              console.log("寻物启示")

              }
              


            },
            fail (res) {
              console.log(res.errMsg)

            }
          })

        }
    
      }
          
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