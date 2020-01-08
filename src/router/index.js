import Vue from 'vue'
import Router from 'vue-router'
import { dynamicAddRoute, mathNotFound, changePageTitle, cancelRequest, baiduStatistics } from './interceptors/index'

/* Router Modules */
import routers from './map/index'

Vue.use(Router)
const createRouter = () => new Router({
  mode: 'hash',
  // mode: 'history',
  routes: routers,
  isLoad: false,
  scrollBehavior: () => ({ y: 0 })
})

const router = createRouter()

// https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter () {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // the relevant part
  router.options.isLoad = false
}

//
router.beforeEach((to, from, next) => {
  // 加入百度统计
  baiduStatistics(to)
  changePageTitle(to)
  cancelRequest()
  dynamicAddRoute(to, from, next, router, (router) => {
    mathNotFound(router)
  })
  // mathNotFound(to, from, next,router)
})

export default router
