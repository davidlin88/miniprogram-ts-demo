/*
 * @Author: Light
 * @Date: 2020-02-25 15:05:21
 * @LastEditTime: 2020-02-27 14:49:47
 * @LastEditors: Light
 * @Description: 
 * @FilePath: /ts-miniprogram-demo/cli/config/env_config/prod.ts
 */
const baseUrl = 'http://192.168.2.18:8080/cpapi/'

const wssUrl = 'wss://api.dwhub.com.cn'
const wxBaseUrl = 'https://api.dwhub.com.cn/wx_api/'
const env = 'development'

export default {
  baseUrl,
  env,
  wssUrl,
  wxBaseUrl,
}
