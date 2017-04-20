# vue-multipage-cli
Simple Multiple-page CLI for scaffolding Vue.js projects which is written based on webpack2.2.1.

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

#### 添加入口文件的方式  
   入口js文件必须添加到src目录下的js文件夹中，之后再将其对应的html文件添加到
   src目录下的pages目录中（目前不支持嵌套多级目录，而且个人也不建议再在pages
   目录下有多级目录，而且html文件的名字必须与对应的js入口文件js的名称相同）。  
   
   每一个入口js文件对应着modules目录下的一个目录，如已经用的index.js对应
   modules目录下的Index.vue。
      
   所以，只要按照以上方式新建文件，就可以做到不进行任何配置，只要添加对应文件
   就行了，之后运行想要运行的构建命令即可~  
