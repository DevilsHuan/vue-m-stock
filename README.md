# vue-m-stock

使用Vue搭建的移动端H5行情，完成基本的行情查看，行情详情，行情自选股等功能。

注：本项目只做为本人练习使用，涉及到的三方接口只作学习，特此说明。

## 预览效果

> http://120.27.24.71/hq/#/

<img src="http://120.27.24.71/hq/demos/01.png" width="250" height="450"> <img src="http://120.27.24.71/hq/demos/02.png" width="250" height="450"> <img src="http://120.27.24.71/hq/demos/03.png" width="250" height="450"> <img src="http://120.27.24.71/hq/demos/04.png" width="250" height="450">


## 技术栈

- vue+vue router+vuex // vue全家桶
- scss // css预处理器
- postcss // css后置处理器
- axios // 服务端交互
- antv/f2 // 图表框架
- good-storage // 客户端存储框架

## 完成功能

- 大盘指数概况
- 指数详情
- 指数排行榜
- 股票搜索
- 股票行情详情
- 股票自选股添加（本地缓存，不依赖账户体系）
- 股票分时，五日，日K图表

## 接口说明

项目所有行情数据使用腾讯接口，本项目只做学习使用，行情可根据情况适配对应的接口。

接口参考文档：

- [接口文档](https://blog.csdn.net/Cupedy/article/details/53261697)
- [接口文档](https://www.liangzl.com/get-article-detail-14585.html)

## 安装及运行

npm install // 安装依赖包

npm run serve // 本地调试

npm run build // 生产打包

## todo

行情，图表数据处理代码优化