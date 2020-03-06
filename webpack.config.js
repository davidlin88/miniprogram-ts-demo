/*
 * @Author: Light
 * @Date: 2020-02-25 18:48:06
 * @LastEditTime: 2020-03-04 15:02:23
 * @LastEditors: Light
 * @Description: scss转wxss的webpack配置，ts的编译在tsc命令里完成，详见package.json的scripts
 * @FilePath: /ts-miniprogram-demo/webpack.config.js
 */

// 单独打包样式文件
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
//删除多余js
const FixStyleOnlyEntriesPlugin = require('webpack-fix-style-only-entries')
const path = require('path')
const glob = require('globby')

// CSS入口配置
const CSS_PATH = {
  pattern: [
    './miniprogram/pages/**/*.scss',
    './miniprogram/components/**/*.scss',
    './miniprogram/style/*.scss',
    './miniprogram/app.scss',
  ],
  src: path.join(__dirname, 'miniprogram') // 相对根目录，用来获取chunk Name
}

// 遍历所有需要打包的文件路径
let getEntries = config => {
  let fileList = glob.sync(config.pattern)
  return fileList.reduce((previous, current) => {
    let filePath = path.parse(path.relative(config.src, current))

    let withoutSuffix = path.join(filePath.dir, filePath.name)
    previous[withoutSuffix] = path.resolve(__dirname, current)
    console.log(previous);
    
    return previous
  }, {})
}

let config = {
  mode: 'production',
  watch: true,
  watchOptions: {
    ignored: ['*/node_modules/']
  },
  entry: Object.assign(getEntries(CSS_PATH)),
  output: {
    path: __dirname
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
          {
            loader: "sass-resources-loader",
            options: {
                resources:['./miniprogram/style/variable.scss','./miniprogram/style/mixin.scss']
            }
        }
        ]
      },
    ]
  },
  plugins: [
    new FixStyleOnlyEntriesPlugin(),
    new MiniCssExtractPlugin({
      filename: '/miniprogram/[name].wxss'
    })
  ],
  resolve: {
    extensions: ['.scss']
  },
}

module.exports = config
