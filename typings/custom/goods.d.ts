/*
 * @Author: Light
 * @Date: 2020-02-28 09:59:12
 * @LastEditTime: 2020-03-06 14:47:22
 * @LastEditors: Light
 * @Description: 商品相关的类型声明
 * @FilePath: /ts-miniprogram-demo/typings/custom/goods.d.ts
 */

//  商品
interface IGoods {
  /** 商品名 */
  title:string
  /** 商品在系统的id */
  goodsId: number
}
interface IListGoods {
  title:string
  goodsId: number
}
type IGoodsList = Array<IListGoods>
