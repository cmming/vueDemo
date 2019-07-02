import Vue from 'vue'
import Router from 'vue-router'
import { dynamicAddRoute } from './interceptors/index'

Vue.use(Router)


/* Router Modules */
import routers from './map/index'
const createRouter = () => new Router({
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
  // ...
  // console.log(dynamicAddRoute)

  dynamicAddRoute(to, from, next,(dynamicRoutes)=>{
    // router.addRoutes(dynamicRoutes)
    // next({ ...to, replace: true })
    if(!router.options.isLoad){
      router.addRoutes(dynamicRoutes)
      router.options.isLoad = true
      next({ ...to, replace: true })
    }else{
      next()
    }
    console.log(router,dynamicRoutes)
  })
})

export default router