/*
 * @Author: Light
 * @Date: 2020-02-24 10:37:42
 * @LastEditTime: 2020-03-06 14:37:03
 * @LastEditors: Light
 * @Description:
 * @FilePath: /ts-miniprogram-demo/miniprogram/pages/my/my.ts
 */
import config from '../../config/index'

let App = getApp()
Page({
  isLoaded: false,
  lockLoadRebate: false,
  data: {
    userInfo: { name: '', avatarUrl: '', uid: 888 },
    bannerAdUnitId: config.bannerAdUnitId.my,
  },

  onLoad: function() {
    this.reload().then(_ => {
      this.isLoaded = true
    })
  },
  onShow: function() {
    if (this.isLoaded) {
      this.reload()
    }
  },
  reload() {
    return Promise.all([])
  },
  toPage(e: any) {
    App.toPage(e)
  },
  async onPullDownRefresh() {
    wx.showLoading({
      title: '刷新中',
    })
    await this.reload()
    wx.hideLoading()
    wx.stopPullDownRefresh()
  },
  onShareAppMessage(){
    return{}
  }
})

export {}
