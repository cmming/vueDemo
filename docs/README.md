# 项目开发指南

> 定义项目的准备材料

## 1、数据mock

> 尽量模拟更多、更灵活的数据。采用 express结合mockjs来生成模拟的数据，express负责根据请求参数做出相应的逻辑。mockjs作为数据的工厂函数，产生更加逼真的数据。


### 1、1 安装express和mockjs

```
cnpm i express mockjs -D

```

## 2、api 文档

> 在项目中添加子模块

```
git submodule add git@github.com:swagger-api/swagger-ui.git

# 切换你分支 到 remotes/origin/2.x 3.* 不支持中文
git checkout -b remotes/origin/2.x 

## 下面三步没必要 除非自己去开发 
cd swagger-ui

npm install

npm run dev

//项目会自动获取参数
Open http://localhost:3200/?url=http://localhost:3777/api.json
```


### 2、1  修改配置

## 3 vue-cli 自定义配置


### 3、1 webpack 相关配置

> 创建vue.config.js 最终通过 webpack-merge 合并


### 3、2 环境变量设置 

> 创建 env 文件 通过 doEnv 插件合并 还可以安装插件让其支持 高级语法 参照react


## 4 项目开发

### 4、1基础插件安装

```
cnpm i axios element-ui vue-i18n store vuex vue-router echarts -S

cnpm i sass-loader node-sass svg-sprite-loader -D
```

### 4、2 路由封装

    https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465