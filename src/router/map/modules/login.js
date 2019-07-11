export default [{
    path: '/login',
    component: () =>
        import ('@/moudles/login/views/login'),
    name: 'login',
    meta: { model: 'login', title: 'login' }
}]