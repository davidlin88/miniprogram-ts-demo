/*
 * @Author: Light
 * @Date: 2020-03-02 17:39:05
 * @LastEditTime: 2020-03-06 14:58:50
 * @LastEditors: Light
 * @Description: 改写wx原生api
 * @FilePath: /ts-miniprogram-demo/miniprogram/utils/hack.ts
 */
// @ts-nocheck fix Page的声明无法修改
import log from './log'
import utils from './utils'

function getPageName() {
  let pages = getCurrentPages()
  let currenPage = pages[pages.length - 1] // 上个页面
  // console.log('当前page:', currenPage)
  return utils.getPageName(currenPage.route)
}
export default () => {
  const originNavigateTo = wx.navigateTo
  const originRedirectTo = wx.redirectTo
  const originSwitchTab = wx.switchTab
  const originNavigateToMiniProgram = wx.navigateToMiniProgram

  const oldPage = Page
  Page = function(app) {
    // onLoad
    const originOnLoad = app.onLoad || function() {}
    app.onLoad = function(options) {
      console.log('options:', options)
      // NOTE:以备不时之需，防止wx去掉Page下自带的options
      // this.options = options
      return originOnLoad.call(this, options)
    }
    // 分享
    const originOnShareAppMessage = app.onShareAppMessage || function() {}
    app.onShareAppMessage = function(options) {
      console.log('share e:', options)
      if (options.target && options.target.id === 'nav-share') {
        return getApp().globalData.shareInfo
      } else if (typeof originOnShareAppMessage === 'function') {
        return originOnShareAppMessage.call(this, options)
      }
    }

    const originOnShow = app.onShow || function() {}
    app.onShow = function(options) {
      // 设置全局options
      const pageName = getPageName()
      options = getApp().globalData.options[pageName] || {}
      // console.log('取用 globalOptions:', options)

      return originOnShow.call(this, options)
    }

    const originOnHide = app.onHide || function() {}
    app.onHide = function() {
      // 清除全局options
      const pageName = getPageName()
      getApp().globalData.options[pageName] = {} // 清除，防止重复触发
      // console.log('清除 globalOptions', getApp().globalData.options)

      return originOnHide.apply(this, arguments)
    }
    // 实时日志
    app.$logger = log
    return oldPage(app)
  }

  Object.defineProperty(wx, 'navigateTo', {
    configurable: true,
    enumerable: true,
    writable: true,
    value: function() {
      const config = arguments[0] || {}
      const url = config.url
      config.fail = config.fail || console.error
      // event.navToPage(url)
      return originNavigateTo.apply(this, arguments)
    },
  })

  Object.defineProperty(wx, 'redirect', {
    configurable: true,
    enumerable: true,
    writable: true,
    value: function() {
      const config = arguments[0] || {}
      config.fail = config.fail || console.error
      return originRedirectTo.apply(this, arguments)
    },
  })

  Object.defineProperty(wx, 'switchTab', {
    configurable: true,
    enumerable: true,
    writable: true,
    value: function() {
      const config = arguments[0] || {}
      let url = config.url
      config.fail = config.fail || console.error

      // 存储全局options
      const targetPageName = utils.getPageName(url)
      getApp().globalData.options = {
        [targetPageName]: utils.getQsParse(url),
      }
      // console.log('设置全局globalOptions:', getApp().globalData.options)
      const pageName = utils.getPageName(url)
      config.url = `/pages/${pageName}/${pageName}` // fix warn

      return originSwitchTab.apply(this, arguments)
    },
  })
  Object.defineProperty(wx, 'navigateToMiniProgram', {
    configurable: true,
    enumerable: true,
    writable: true,
    value: function() {
      const config = arguments[0] || {}
      const originSuccess = config.success || function() {}
      const originFail = config.fail || function() {}

      config.success = function(res) {
        Object.assign(config, {
          result: 'success',
        })
        originSuccess.apply(this, arguments)
      }
      config.fail = function(res) {
        console.error(res)
        Object.assign(config, {
          result: 'fail',
        })
        originFail.apply(this, arguments)
      }
      return originNavigateToMiniProgram.apply(this, arguments)
    },
  })
}
