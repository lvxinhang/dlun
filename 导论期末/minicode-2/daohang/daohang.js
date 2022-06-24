Page({
    data: {
        latitude: 0, //首次加载维度
        longitude: 0, //首次加载的经度
        mapName: "", //选点的位置
    },
    moveToLocation() {
        let that = this
        wx.chooseLocation({
            success: function (res) {
                console.log(res.name);
                //赋值给data中的mapName
                that.setData({
                    mapName: res.name
                })
            },
            //错误信息
            fail: function () {
                console.log(err);
            }
        })
    }
})
