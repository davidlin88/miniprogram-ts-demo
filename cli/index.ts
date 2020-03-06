/*
 * @Author: Light
 * @Date: 2020-02-25 15:27:49
 * @LastEditTime: 2020-03-06 18:24:08
 * @LastEditors: Light
 * @Description: 脚手架脚本，生成页面
 * @FilePath: /ts-miniprogram-demo/cli/index.ts
 */
import { create } from './utils'
import {
  contentPageTs,
  contentPageJson,
  contentPageWxml,
  contentPageScss,
  contentComponentTs,
  contentComponentJson,
  contentComponentWxml,
  contentComponentScss,
} from './template'
import fs = require('fs')

const textColor1 = '\x1b[33m'
const textColor2 = '\x1b[36m%s\x1b[0m'

function genFile(options: IGenFile) {
  const { fileName, pathName, ts, wxml, scss, json } = options
  console.log(textColor1, `start gen demo-page: ${fileName}...`, '\n')
  const filePathTs = `${pathName}${fileName}/${fileName}.ts`
  const filePathWxml = `${pathName}${fileName}/${fileName}.wxml`
  const filePathScss = `${pathName}${fileName}/${fileName}.scss`
  const filePathJson = `${pathName}${fileName}/${fileName}.json`

  create(filePathTs, ts)
  create(filePathWxml, wxml)
  create(filePathScss, scss)
  create(filePathJson, json)

  console.log(textColor2, `gen demo-page:${fileName} successful`)
}

function addRoute(fileName: string) {
  const jsonPath = './miniprogram/app.json'
  fs.readFile(jsonPath, (err, data) => {
    if (err) {
      return console.error(err)
    }
    let json = JSON.parse(data.toString())
    // console.log(json);
    const pagePath = `pages/${fileName}/${fileName}`
    const pages = json['pages']
    if (!pages.includes(pagePath)) {
      json['pages'].push(pagePath)
    }
    json = JSON.stringify(json, null, '\t')
    fs.writeFileSync(jsonPath, json, 'utf-8')
  })
}

function addComponent(fileName: string) {
  genFile({
    fileName,
    pathName: './miniprogram/components/',
    ts: contentComponentTs,
    wxml: contentComponentWxml,
    json: contentComponentJson,
    scss: contentComponentScss,
  })
}

function main() {
  const target = process.argv[3]
  const fileName = process.argv[4]
  if (target === 'page') {
    addPage(fileName)
  } else if (target === 'component') {
    addComponent(fileName)
  }
}

function addPage(fileName: string) {
  genFile({
    fileName,
    pathName: './miniprogram/pages/',
    ts: contentPageTs,
    wxml: contentPageWxml,
    json: contentPageJson,
    scss: contentPageScss,
  })
  addRoute(fileName)
}
main()

export {}
