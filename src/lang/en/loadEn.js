const _ = require('lodash')
const modulesFiles = require.context('@', true, /en.js$/)

// you do not need `import app from './modules/app'`
// it will auto require all vuex module from modules file
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  // set './app.js' => 'app'
  // const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath)

  const langKey = value.default.langKey
  const lang = value.default.lang
  // console.log(modules, modulePath,moduleName,value)
  if (!_.hasIn(modules, langKey)) {
    modules[langKey] = lang
  } else {
    alert(modulePath + '语言包的冲突')
  }
  return modules
}, {})

export default modules
