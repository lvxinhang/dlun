//index.js
//这里只获取了实况天气信息，没有用预测信息
//获取应用实例
const app = getApp()

Page({
  data: {
    adcode:'',
    city:'110100',
    humidity:'',
    province:'',
    reporttime:'',
    temperature:'',
    weather:'',
    winddirection:'',
    windpower:'',
    locationObj: {}
  },

  onLoad:function(){
    var self = this;
    // 调用定位方法
    this.getUserLocation();
    wx.request({
      url: 'https://restapi.amap.com/v3/weather/weatherInfo',
      data:{
        'key': 'e306d88269c1354b56263376ebef7b05',//改为自己申请的Key
        'city': self.data.city,
        'extensions': 'base'
      },
      header:{
        'content-type': 'application/json'
      },
      success:function(res){
        self.setData({
          adcode: res.data.lives[0].adcode,
          city: res.data.lives[0].city,
          humidity: res.data.lives[0].humidity,
          province: res.data.lives[0].province,
          temperature: res.data.lives[0].temperature,
          reporttime: res.data.lives[0].reporttime,
          weather: res.data.lives[0].weather,
          winddirection: res.data.lives[0].winddirection,
          windpower: res.data.lives[0].windpower
        })
      }
    })
  },
  // 定位方法
  getUserLocation: function () {
    let _this = this
    wx.getLocation({
      type: 'gcj02', // type有两中类型，gcj02 是腾讯地图所能解析的
      success: res => {
        _this.setData({
          locationObj: res,
          city:''
        })
        // 调用获取城市名称方法
        _this.getCity()
      }
    })
  },
  
  // 获取定位城市名称方法
  getCity: function () {
    var _this = this
    wx.request({
      url: `https://apis.map.qq.com/ws/geocoder/v1/?key=2JZBZ-IOO3D-YEY4E-PGNUN-KRK22-OXFW7&location=`+ _this.data.locationObj.latitude + ',' +_this.data.locationObj.longitude,
      success: res => {
 // 此处返回的就是需要查询的城市名称
        _this.setData({
            city:res.data.result.ad_info.adcode
        })
      }
    })
  }
})
