import LayoutAdmin from '@/layout/index.vue'

export default [{
    path: '/admin',
    component: LayoutAdmin,
    redirect: 'noRedirect',
    name: 'adminErrorPage',
    meta: {
        title: 'ui',
        icon: 'table',
        model:'error'
    },
    children: [{
            path: '401',
            component: () =>
                import ('@/views/errorPage/401'),
            name: '401',
            meta: { model:'error',title: '401' }
        },
        {
            path: '404',
            component: () =>
                import ('@/views/errorPage/404'),
            name: '404',
            meta: { model:'error',title: '404' }
        }
    ]
}]