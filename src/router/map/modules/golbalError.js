export default [{
        path: '/401',
        component: () =>
            import ('@/views/errorPage/401'),
        name: 'golbalError401',
        meta: { title: 'form' }
    },
    {
        path: '/404',
        component: () =>
            import ('@/views/errorPage/404'),
        name: 'golbalError404',
        meta: { title: 'table' }
    },
    // {
    //     path: '*',
    //     component: () =>
    //         import ('@/views/errorPage/404'),
    //     name: 'golbalError404',
    //     meta: { title: 'table' }
    // }
]