/*
 * @Author: Light
 * @Date: 2020-02-27 14:16:12
 * @LastEditTime: 2020-03-06 18:28:18
 * @LastEditors: Light
 * @Description: 
 * @FilePath: /ts-miniprogram-demo/typings/custom/request.d.ts
 */

type ParamsTurnPage = {
  limit:number,
  offset:number
}
interface ParamGoodsList extends ParamsTurnPage {
  status:number
}