/*
 * @Author: Light
 * @Date: 2020-03-06 17:10:53
 * @LastEditTime: 2020-03-06 17:10:54
 * @LastEditors: Light
 * @Description: 
 * @FilePath: /ts-miniprogram-demo/cli/template.ts
 */


export const contentPageTs = `import * as api from "../../utils/request"
import config from '../../config/index'

Page({
  options: {
  },
  isLoaded: false,
  data: {
    userInfo: { name: '', avatarUrl: '' },
  },

  onLoad: function (options: any) {
    this.options = options

    this.reload().then(() => {
      this.isLoaded = true
    })
  },
  onShow: function () {
    if (this.isLoaded) {
      this.reload()
    }
  },
  reload() {
    return Promise.all([])
  },
  
  async onPullDownRefresh() {
    wx.showLoading({
      title: '刷新中',
    })
    await this.reload()
    wx.hideLoading()
    wx.stopPullDownRefresh()
  },
})

export { }`
export const contentPageWxml = ``
export const contentPageScss = ``
export const contentPageJson = `{
  "navigationBarTitleText":"",
  "usingComponents":{}
}`

export const contentComponentWxml = ``
export const contentComponentScss = ``
export const contentComponentTs = `
Component({
  properties: {
  },

  data: {
  },

  methods: {
  },
})
`
export const contentComponentJson = `{
  "component": true,
  "usingComponents": {}
}`