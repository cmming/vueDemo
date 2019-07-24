import Vue from 'vue'

// 自动加载 global 目录下的 .js 结尾的文件
const componentsContext = require.context('./global/', true, /index.js$/)
// const componentsContext = require.context('./global/', true, /\.js$/)

componentsContext.keys().forEach(component => {

    const componentConfig = componentsContext(component)
        /**
         * 兼容 import export 和 require module.export 两种规范
         */
    const ctrl = componentConfig.default || componentConfig
    for (var k in ctrl) {
        // eslint-disable-next-line
        console.log(ctrl[k].name, ctrl[k])
        Vue.component(ctrl[k].name, ctrl[k])
    }
    // Vue.component(ctrl.name, ctrl)
})