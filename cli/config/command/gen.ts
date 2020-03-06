/*
 * @Author: Light
 * @Date: 2020-02-25 15:04:48
 * @LastEditTime: 2020-02-27 15:33:14
 * @LastEditors: Light
 * @Description: 
 * @FilePath: /ts-miniprogram-demo/cli/config/command/gen.ts
 */
/*
 * @Author: Light
 * @Date: 2020-02-25 15:04:48
 * @LastEditTime: 2020-02-27 14:42:16
 * @LastEditors: Light
 * @Description: 
 * @FilePath: /ts-miniprogram-demo/cli/config/command/gen.ts
 */
const fs = require('fs')
const path = require('path')
import base from '../env_config/base'
import prod from '../env_config/prod'
import dev from '../env_config/dev'
import test from '../env_config/test'

const FgYellow = '\x1b[33m'
 
function merge(mode: IEnv) {
  var config: any = {
  }
  // 根据不同的环境生成不同的配置文件
  if (mode == 'production') {
    config = Object.assign({}, base, prod)
  } else if (mode === 'development') {
    config = Object.assign({}, base, prod, dev)
  } else {
    config = Object.assign({}, base, prod, test)
  }
  if (config._afterMerge) {
    config._afterMerge(config)
  }
  return config
}

function genFile(mode: IEnv) {
  console.log(FgYellow, 'start gen config for env', mode, '\n')
  const filePath = path.join(__dirname, '../../../miniprogram/config/index.ts')
  const ftitle =
    '//配置文件编译生成，手动更改本文件可能会导致更改丢失，配置修改请前往env_config，阅读readme.md了解详细信息\n'
  const config = merge(mode)
  const fileContent =
    ftitle + 'export default ' + JSON.stringify(config, null, 2)

  fs.writeFileSync(filePath, fileContent)
  // console.log(FgWhite, fileContent, '\n')
  console.log(FgYellow, 'gen config for env', mode, 'successful')
}

function main() {
  genFile(process.argv[3])
}

// 入口函数
main()
