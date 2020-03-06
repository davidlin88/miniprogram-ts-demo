//配置文件编译生成，手动更改本文件可能会导致更改丢失，配置修改请前往env_config，阅读readme.md了解详细信息
export default {
  "appId": "wx656645c23f560ebe",
  "version": "0.1",
  "statUrl": "https://stat.dwhub.com.cn",
  "demoImgUrl": "https://i.picsum.photos/id/158/200/200.jpg",
  "performanceEventIdMap": {
    "login": 1002,
    "hongbaoRender": 2001
  },
  "bannerAdUnitId": {
    "index": "",
    "my": "",
    "goods": ""
  },
  "interstitialAdUnitId": {
    "goods": ""
  },
  "videoAdUnitId": {
    "goods": ""
  },
  "shareActions": {
    "helpWithdraw": "helpWithdraw"
  },
  "withdraw": {
    "minWithdraw": 50,
    "maxWithdraw": 200000
  },
  "shareImgUrl": {},
  "storageKeyList": {},
  "CODES_NO_ADVERTISEMENT_BANNER": [
    1004,
    1008
  ],
  "CODES_NO_ADVERTISEMENT_VIDEO": [
    1004,
    1008,
    0
  ],
  "CODES_NO_ADVERTISEMENT_INTERSTITIAL": [
    1004,
    1008
  ],
  "normalPlatformList": [
    "ios",
    "android",
    "devtools"
  ],
  "abnormalPlatformList": [
    "windows"
  ],
  "cos": {
    "folder": "community",
    "region": "ap-shanghai",
    "bucket": "image-1257131805"
  },
  "tabPageList": [
    "index",
    "my"
  ],
  "wxMessage": {
    "getUserInfoAccepted": "getUserInfo:ok",
    "getUserInfoDenied": "getUserInfo:fail auth deny"
  },
  "baseUrl": "http://192.168.2.18:8081/cpapi/",
  "env": "development",
  "wssUrl": "wss://api.dwhub.com.cn",
  "wxBaseUrl": "https://api.dwhub.com.cn/wx_api/",
  "raven": {
    "dsn": "https://3a367af5c1e9492f92c434a3c8340636@crash.dwhub.com.cn/4",
    "options": {
      "release": "0.1",
      "environment": "development",
      "allowDuplicates": true,
      "sampleRate": 0.5,
      "autoBreadcrumbs": {
        "console": false
      }
    }
  }
}