
// const _ =require('lodash')
const modulesFiles = require.context('@', true, /zh.menu.js$/)

// you do not need `import app from './modules/app'`
// it will auto require all vuex module from modules file
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
    // set './app.js' => 'app'
    // const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
    const value = modulesFiles(modulePath)
    const lang = value.default
    modules = Object.assign(modules,lang)
    // console.log(modules, modulePath,moduleName,value)
    // modules.push(lang)
    // if(!_.hasIn(modules,langKey)){
    //     modules.push(...lang)
    // }else{
    //     alert(modulePath+"语言包的冲突")
    // }
    return modules
}, {})
const menuList = {
    // "test":{
    //     "dashborad":"首页管理",
    //     "dashboradIndex":"首页",

    //     "ui":"ui 管理",
    //     "form":"表单",
    //     "table":"表格",
    //     "file":"文件",
    //     "imgCropper":"imgCropper",

    //     "user":"用户管理",
    //     "userList":"用户列表",
    //     "userStore":"保存用户",
    //     "userUpdate":"更新用户",

    //     "systemManager":"系统管理",
    //     "routerList":"路由管理",
    //     "roleList":"角色管理",
    //     "storeRole":"保存角色",
    //     "updateRole":"更新角色",
    // },


    // 'dashborad': {
    //     'title': '首页',
    //     'dashborad':"首页",
    // },
    // 'ui': {
    //     'title': 'ui',
    //     'table': '表格',
    //     'form': '表单',
    //     'file': '文件上传',
    //     'imgCropper':"图片裁切"
    // },
    // 'error':{
    //     'title': '错误页面',
    //     '404':'页面内不存在',
    //     '401':'权限拒绝'
    // },
    // 'register':{
    //     'title':"注册",
    //     'register':"注册"
    // },
    'Dashboard': '首页',
    ...modules
}

export default menuList