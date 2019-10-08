import Vue from 'vue'
import i18n from './lang/index'
import Element from 'element-ui'
import './styles/element-variables.scss'
import 'normalize.css/normalize.css'
import 'element-ui/lib/theme-chalk/index.css';
// 
import GLOBAL_CONFIG from '@/config/globalConfig'
window.GLOBAL_CONFIG = GLOBAL_CONFIG
Vue.prototype.GLOBAL_CONFIG = GLOBAL_CONFIG
import App from './App.vue'
import router from './router'
import store from './store'
import _ from 'lodash'
Vue.prototype._ = _
import storage from './utils/storage';
window.storage = storage;
import './icons' // icon
//全局组件自动注册
import './components/index'
import './filter/index';
import Echo from "laravel-echo"
window.io = require('socket.io-client');

window.Echo = new Echo({
    broadcaster: 'socket.io',
    host: process.env.VUE_APP_WS_BASE_API+':6001',
    auth: {
        headers: {
            'Authorization': 'Bearer ' + store.getters.userInfo.token
        }
    }
});
Vue.config.productionTip = false
Vue.use(Element, {
    // size: Cookies.get('size') || 'medium' // set element-ui default size
    size: store.getters.size
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