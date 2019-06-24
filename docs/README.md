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
