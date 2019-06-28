const modulesFiles = require.context('./modules', true, /\.js$/)

// you do not need `import app from './modules/app'`
// it will auto require all vuex module from modules file
// let all_api = {}

const modules = modulesFiles.keys().reduce((modules, modulePath) => {
    // set './app.js' => 'app'
    // const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
    const value = modulesFiles(modulePath)
    // modules[moduleName] = {...value.default}
    // Object.assign(modules,value.default)
    return Object.assign(modules,value.default)
}, {})

export default modules