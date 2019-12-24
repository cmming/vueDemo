export default function mathNotFound (router) {
  router.addRoutes([{
    path: '*',
    redirect: '/login'
  }, {
    path: '/admin/*',
    redirect: '/admin/404'
  }])
}
