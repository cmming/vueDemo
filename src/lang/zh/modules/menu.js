
const _ =require('lodash')
const modulesFiles = require.context('@', true, /zh.menu.js$/)

// you do not need `import app from './modules/app'`
// it will auto require all vuex module from modules file
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
    // set './app.js' => 'app'
    // const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
    const value = modulesFiles(modulePath)

    const langKey = value.default.langKey
    const lang = value.default.lang
    // console.log(modules, modulePath,moduleName,value)
    if(!_.hasIn(modules,langKey)){
        modules[langKey] = lang
    }else{
        alert(modulePath+"语言包的冲突")
    }
    return modules
}, {})
const menuList = {
    'dashborad': {
        'title': '首页',
        'dashborad':"首页",
    },
    'ui': {
        'title': 'ui',
        'table': '表格',
        'form': '表单',
        'file': '文件上传',
        'imgCropper':"图片裁切"
    },
    'error':{
        'title': '错误页面',
        '404':'页面内不存在',
        '401':'权限拒绝'
    },
    ...modules
}

export default menuList