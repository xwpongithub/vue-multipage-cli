# Changelog

## 2017-02-14 V1.2.0

1.精简了utils.js里生成loader的代码以及对less及sass等其他预处理语言的支持不友好问题
2.现在若想在生产环境下将css压缩，必须将config目录下的index.js中的productionSourceMap改为true

## 2017-02-14 V1.1.2  

1.优化了webpack的配置项
2.增加了构建分析模块webpack-bundle-analyzer分析构建情况

## 2017-02-13 V1.1.0

1. 修复了dev模式下配置sourceMap需要生成时不生成的问题
2. 对配置项进行了一些优化
3. 对utils.js的代码进行了少许优化

## 2017-02-11 V1.0.9  

1. 增加了sass，less等预处理语言的配置，不再是只支持stylus了  
2. 修复了开发时改变css样式时页面不会自动刷新的问题
3. 修复了build模式下css不会压缩的问题
4. 将一些过时的配置项改为最新的支持项
