import Vue from 'vue'
import Router from 'vue-router'
import { dynamicAddRoute,mathNotFound } from './interceptors/index'

Vue.use(Router)


/* Router Modules */
import routers from './map/index'
const createRouter = () => new Router({
  // mode: 'hash',
  mode: 'history',
  routes: routers,
  isLoad:false
})

const router = createRouter()

// https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // the relevant part
}


//
router.beforeEach((to, from, next) => {

  dynamicAddRoute(to, from, next,router,(router)=>{
    mathNotFound(router)
  })
  // mathNotFound(to, from, next,router)
})

export default router