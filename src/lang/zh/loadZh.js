const modulesFiles = require.context('@', true, /zh.js$/)

// you do not need `import app from './modules/app'`
// it will auto require all vuex module from modules file
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  // set './app.js' => 'app'
  // const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath)

  const langKey = value.default.langKey
  const lang = value.default.lang
  // console.log(modules, modulePath,moduleName,value)
  modules[langKey] = lang
  return modules
}, {})

export default modules
