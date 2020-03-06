/*
 * @Author: Light
 * @Date: 2020-02-25 15:05:21
 * @LastEditTime: 2020-03-03 18:30:33
 * @LastEditors: Light
 * @Description:
 * @FilePath: /ts-miniprogram-demo/cli/config/env_config/base.ts
 */
// 基础配置
const appId = 'wx656645c23f560ebe'
const statUrl = 'https://stat.dwhub.com.cn'

// 小程序版本
const version = '0.1'

// raven配置生成器
const _ravenGen = ({ env, version }: { env: IEnv; version: string }) => {
  return {
    dsn: 'https://3a367af5c1e9492f92c434a3c8340636@crash.dwhub.com.cn/4',
    options: {
      release: version,
      environment: env, // production才会上报
      allowDuplicates: true, // 允许相同错误重复上报
      sampleRate: 0.5,
      autoBreadcrumbs: {
        console: false, // 禁止默认收集console日志的行为
      },
    },
  }
}

// hook, 配置merge之后执行
const _afterMerge = (mergedConfig?: any) => {
  mergedConfig.raven = _ravenGen(mergedConfig)
}

export default {
  appId,
  version,
  statUrl,
  demoImgUrl: 'https://i.picsum.photos/id/158/200/200.jpg',
  performanceEventIdMap: {
    login: 1002,
    hongbaoRender: 2001,
  },
  bannerAdUnitId: {
    index: '',
    my: '',
    goods: '',
  },
  interstitialAdUnitId: {
    goods: '',
  },
  videoAdUnitId: {
    goods: '',
  },
  // 分享行为的名字
  shareActions: {
    helpWithdraw: 'helpWithdraw',
  },
  withdraw: {
    minWithdraw: 0.5 * 100, // 最小提现，分
    maxWithdraw: 2000 * 100, // 最大提现，分
  },
  shareImgUrl: {},
  storageKeyList: {},
  CODES_NO_ADVERTISEMENT_BANNER: [1004, 1008],
  CODES_NO_ADVERTISEMENT_VIDEO: [1004, 1008, 0],
  CODES_NO_ADVERTISEMENT_INTERSTITIAL: [1004, 1008],
  normalPlatformList: ['ios', 'android', 'devtools'],
  abnormalPlatformList: ['windows'],
  cos: {
    folder: 'community',
    region: 'ap-shanghai',
    bucket: 'image-1257131805',
  },
  _afterMerge,
  tabPageList: ['index', 'my'],
  wxMessage: {
    getUserInfoAccepted: 'getUserInfo:ok',
    getUserInfoDenied: 'getUserInfo:fail auth deny',
  },
}
