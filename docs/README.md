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

```
果然，环境变量有自己的命名规范和 create-react-app 一样（REACT_APP），使用 (VUE_APP)；
```


## 4 项目开发

### 4、1基础插件安装

```
cnpm i axios element-ui vue-i18n store vuex vue-router echarts normalize.css -S

cnpm i sass-loader node-sass svg-sprite-loader -D
```

### 4、2 路由封装

    https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465


#### 4.2.1 路由懒加载

#### 4.2.2 路由动态加载

```
1.使用接口动态生成一个动态路由的js文件，然后使用接口调用脚本去打包。这种方式比较耗时。但是整体思路不依赖官方api。（前年在没有官方api的时候用过，这种方式还是很灵活）
2.使用一个已经写好的动态路由配置文件，然后根据路由前面的角色去匹配用户是否有权限。（用过，模式比较死板）
3.官方推出一个api addRoutes使得可以动态加载路由。

```


## eslint

```
// 0或’off’：关闭规则。 
// 1或’warn’：打开规则，并且作为一个警告（并不会导致检查不通过）。 
// 2或’error’：打开规则，并且作为一个错误 (退出码为1，检查不通过)。
```



## 5 通用业务组件


### 5、1 表格

- [x]  1.支持 filter ,表格字段转换
- [x]  2.支持 自定义事件
- [x]  3.分页 但是小屏幕显示有问题
- [ ]  4.搜索区域


### 5、2 表单


### 5、3 上传组件

> 文档 https://lian-yue.github.io/vue-upload-component/#/zh-cn/documents#%E5%85%A5%E9%97%A8%E5%BC%80%E5%A7%8B-npm

```
    cnpm install vue-upload-component -S
```

所有文件上传都走一个独立的业务接口，方便控制。


## 6 配置统一化

### 6.1 接口配置


```
200：OK，标准的响应成功状态码
201：Object created，用于 store 操作
204：No content，操作执行成功，但是没有返回任何内容
206：Partial content，返回部分资源时使用
400：Bad request，请求验证失败
401：Unauthorized，用户需要认证
403：Forbidden，用户认证通过但是没有权限执行该操作
404：Not found，请求资源不存在
500：Internal server error，通常我们并不会显示返回这个状态码，除非程序异常中断
503：Service unavailable，一般也不会显示返回，通常用于排查问题用
```