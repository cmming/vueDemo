import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)


/* Router Modules */
import constRouter from './map/constRouterMap'  

const createRouter = () => new Router({
  mode: 'history',
  routes: [constRouter]
})

const router = createRouter()

// https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter () {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // the relevant part
}

export default router