export default [{
        path: '/401',
        component: () =>
            import ('@/views/errorPage/401'),
        name: 'golbalError401',
        meta: { model:'error',title: '401' }
    },
    {
        path: '/404',
        component: () =>
            import ('@/views/errorPage/404'),
        name: 'golbalError404',
        meta: { model:'error',title: '404' }
    }
]