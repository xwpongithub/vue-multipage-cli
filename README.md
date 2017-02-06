# webpack-multipage-cli
Simple Multiple-page CLI for scaffolding Vue.js projects which is written based on webpack2.2.1.

#### 基本使用方法
  使用方法与vue官方的vue-cli基本是一样的，只是因为是多页面应用程序，所以目前这个版本
  html页面和js入口文件还需要自己手动到build目录下相应的配置文件里去配置一下。
  
#### 基本构建命令
  `npm run dev` 开启测试环境，在测试环境下开发  
  
  `npm run build` 发布正式版本  
  
  `npm run lint` 应用eslint检测js，vue文件的语法以及规则

#### 添加入口文件的方式
  在build目录下的entries.js文件中添加，如：`passport:projectJs+'/passport.js'`,
之后在src的js目录下添加对应的js即可，之后需要在webpack.dev.conf.js和webpack.prod.conf
中配置其对应的html文件，添加html文件的方式如：  

dev模式下：
     ```javascript
     new HtmlWebpackPlugin({
           filename: 'pages/user.html',
           template: projectSrc+'/pages/user.html',
           inject: true,
           chunks: ['vendor','manifest','user']=>user为对应entries.js文件中的key值
     });
     ```  
     
prod模式下:
     ```javascript
     new HtmlWebpackPlugin({
           filename: 'pages/user.html',
           template: projectSrc+'/pages/user.html',
           inject: true,
           minify: {
             removeComments: true,
             collapseWhitespace: true,
             removeAttributeQuotes: true
           },
           chunks: ['vendor','manifest','user'],
           chunksSortMode: 'dependency'
     });
     ```
     
具体配置请参看对应文件下已有的html配置项。  
后期打算把html文件这里的配置更为灵活，而不用像现在这样手动配置这么多东西。
