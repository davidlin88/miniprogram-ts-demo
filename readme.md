<!--
 * @Author: Light
 * @Date: 2020-03-06 18:52:54
 * @LastEditTime: 2020-03-06 18:58:54
 * @LastEditors: Light
 * @Description: 项目说明
 * @FilePath: /miniprogram-ts-demo/readme.md
 -->

## 项目介绍
小程序手脚架，除原生小程序技术外，引入了ts、scss、iconfont，集成了webpack，实现一键启动ts、scss监听编译，详见`/package.json`.script

## 启动准备
安装node.js、微信开发者工具

## 启动方式
安装依赖：`npm install` 或 `yarn install`
启动开发监听：`npm run start` 或 `yarn start`
启动开发+脚手架修改监听（如果要修改`/cli`下的脚手架配置的话）：`npm run start:all` 或 `yarn run start:all`

启动微信开发者工具选择项目根目录打开

*ps:监听启动后，会在项目下的`*.ts`和`*.scss`的文件的同位置生成同名的`*.js`和`*.wxss`*

## 打包配置
为减小打包体积，项目已配置了忽略打包`*.ts`、`*.scss`、`/typings`、`/cli`等规则，详见`/project.config.json`.packOptions.ignore，项目启动后用开发工具上传即可。

## 开发
新建页面：`npm run add:page [页面名]`或`yarn add:page [页面名]`，如`yarn add:page demo_page`
新建组件：同理，`npm run add:page [组件名]`或`yarn add:page [组件名]`

页面与组件的模板位于`/cli/template.ts`处，可自由编辑
## 第三方扩展
引入第三方js库：优先考虑安装`@types/库名`的声明文件，并在`tsconfg.json`.compilerOptions.types内添加；没有声明文件的，可以在文件开头添加`// @ts-nocheck`，以忽略ts的检查

*ps:因项目编译环境（node.js）与运行环境（小程序）不同，项目的声明文件也有差异，故cli与项目根目录下分别配置了一个`tsconfig.json`文件，防止在require node核心库等情况时编辑器报错*