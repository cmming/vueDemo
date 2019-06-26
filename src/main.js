import '@babel/polyfill';
import Vue from 'vue'
import i18n from './lang/index'
import Element from 'element-ui'
import 'normalize.css/normalize.css'
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import router from './router'
import './icons' // icon
//全局组件自动注册
import './components/index'
Vue.config.productionTip = false

Vue.use(Element, {
  // size: Cookies.get('size') || 'medium' // set element-ui default size
  size: 'medium'
})

new Vue({
  render: h => h(App),
  router,
  i18n
}).$mount('#app')
