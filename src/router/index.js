import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)


/* Router Modules */
import routers from './map/index'
const createRouter = () => new Router({
  mode: 'history',
  routes: routers
})

const router = createRouter()

// https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter () {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // the relevant part
}

export default router