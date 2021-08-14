// pages/search/search.js
const db=wx.cloud.database();

Page({

    data: {
        keywords:"",
        datalist:[]
    },
// 获取用户输入
    onChange(e) {
        console.log(e.detail)
        this.setData({
             keywords:e.detail
        })
        },

// 从数据库查找并渲染页面
    onClick(){
        db.collection('xunwu-database').where({
            //使用正则查询，在collection"gucci"中模糊搜索
        goodsname: db.RegExp({
        regexp: "钥匙",
        //从搜索栏中获取的search作为规则进行匹配。
        options: 'i',
        //大小写不区分value
        // goodsname:this.data.keywords
        }),
        information:db.RegExp({
        regexp: this.data.keywords,
        //从搜索栏中获取的search作为规则进行匹配。
        options: 'i',
            //大小写不区分value
            // goodsname:this.data.keywords
        })
             }).get().then(res=>{

                    // res.data 包含该记录的数据
                    console.log("查询结果")
                    //   console.log(res.data)
                    var data=res.data
                    data.reverse()
                    console.log(data)
                    this.setData({
                        datalist:data
                    })
                  
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
 
},






// 获取帖子



























    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            keywords:"钥匙"
       })
       this.onClick()
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