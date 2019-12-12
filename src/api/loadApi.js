const modulesFiles = require.context('@/modules', true, /\.api.js$/)

// you do not need `import app from './modules/app'`
// it will auto require all vuex module from modules file
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
    // set './app.js' => 'app'
    const value = modulesFiles(modulePath)
    return Object.assign(modules,value.default)
}, {})

export default modules