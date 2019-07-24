export default [{
    path: '/login',
    component: () =>
        import ('@/moudles/login/views/login'),
    name: 'login',
    meta: { model: 'login', title: 'login' }
},{
    path: '/register',
    component: () =>
        import ('@/moudles/login/views/register'),
    name: 'register',
    meta: { model: 'register', title: 'register' }
}]