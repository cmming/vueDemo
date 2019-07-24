// const _ =require('lodash')
const modulesFiles = require.context('@', true, /en.menu.js$/)

// you do not need `import app from './modules/app'`
// it will auto require all vuex module from modules file
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
    // set './app.js' => 'app'
    // const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
    const value = modulesFiles(modulePath)

    // const langKey = value.default.langKey
    const lang = value.default
    // console.log(modules, modulePath,moduleName,value)
    modules = Object.assign(modules,lang)
    // modules.push(lang)

    // if(!_.hasIn(modules,langKey)){
    //     modules[langKey] = lang
    // }else{
    //     alert(modulePath+"语言包的冲突")
    // }
    return modules
}, {})


const menuList = {
    // "test":{
    //     "dashborad":"dashborad manage",
    //     "dashboradIndex":"dashborad",

    //     "ui":"ui manage",
    //     "form":"form",
    //     "table":"table",
    //     "file":"file",
    //     "imgCropper":"imgCropper",

    //     "user":"user manage",
    //     "userList":"user list",
    //     "userStore":"store user",
    //     "userUpdate":"update user",

    //     "systemManager":"system manage",
    //     "routerList":"router list",
    //     "roleList":"role list",
    //     "storeRole":"store role",
    //     "updateRole":"update role",
    // },

    

    // 'dashborad': {
    //     'title': 'dashborad',
    //     'dashborad':"dashborad",
    // },
    // 'ui': {
    //     'title': 'ui',
    //     'table': 'table',
    //     'form': 'form',
    //     'file': 'file upload',
    //     'imgCropper':"img cropper"
    // },
    // 'error':{
    //     'title': 'error page',
    //     '404':'page not found',
    //     '401':'premission deny'
    // },
    // 'register':{
    //     'title':"register",
    //     'register':"register"
    // },
    ...modules
}


export default menuList