export default [{
  path: '/login',
  component: () =>
        import('@/modules/login/views/login'),
  name: 'login',
  meta: { model: 'login', title: 'login' }
}, {
  path: '/register',
  component: () =>
        import('@/modules/login/views/register'),
  name: 'register',
  meta: { model: 'register', title: 'register' }
}, {
  path: '',
  redirect: '/login'
}, {
  path: '/',
  redirect: '/admin/dashborad/index'
}]
