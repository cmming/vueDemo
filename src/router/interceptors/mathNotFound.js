export default function mathNotFound (router) {
  router.addRoutes([{
    path: '*',
    redirect: '/404'
  }, {
    path: '/admin/*',
    redirect: '/admin/404'
  }])
}
