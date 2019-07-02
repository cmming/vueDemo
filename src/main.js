import Vue from 'vue'
import i18n from './lang/index'
import Element from 'element-ui'
import 'normalize.css/normalize.css'
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import router from './router'
import store from './store'
import _ from 'lodash'
Vue.prototype._ = _
import './icons' // icon
//全局组件自动注册
import './components/index'
import './filter/index';
Vue.config.productionTip = false

Vue.use(Element, {
    // size: Cookies.get('size') || 'medium' // set element-ui default size
    size: 'medium'
})

new Vue({
  render: h => h(App),
  i18n,
  store,
  router,
}).$mount('#app')


// new Vue({
//     el: '#app',
//     i18n,
//     router,
//     store,
//     render: h => h(App)
// })