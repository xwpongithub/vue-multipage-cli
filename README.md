# vue-multipage-cli
Simple Multiple-page CLI for scaffolding Vue.js projects.

#### 基本使用方法
  使用方法与vue官方的vue-cli基本是一样的，只是因为是多页面应用程序，所以目前这个版本
  html页面和js入口文件还需要自己手动到build目录下相应的配置文件里去配置一下。

#### 基本构建命令
  `npm update` 更新依赖的模块

  `npm install` 安装依赖模块（其他命令必须在运行完此命令后才能调用！）

  `npm run dev` 开启测试环境，在测试环境下开发

  `npm run build` 发布正式版本

  `npm run build --report` 发布正式版本的同时输出构建情况

  `npm run lint` 应用eslint检测js，vue文件的语法以及规则

#### 相比于1.x版本的变化
  现在每一个模块都有一个对应的文件目录，如src目录中示例目录user和index。加入了传参示例，单页与单页间需要传参的话通过url传递即可，单页内
采用vue-router的模式来传参即可（住：此中cli的构建方式不支持vue-router的history模式，若必须采用history模式，请考虑其他cli）。
