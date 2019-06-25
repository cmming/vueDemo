import Vue from 'vue'
import Element from 'element-ui'
import 'normalize.css/normalize.css'
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

Vue.use(Element, {
  // size: Cookies.get('size') || 'medium' // set element-ui default size
  size: 'medium'
})

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
