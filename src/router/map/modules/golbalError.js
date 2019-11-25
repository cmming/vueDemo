import LayoutAdmin from '@/layout/index.vue'

export default [{
        path: '/401',
        component: () =>
            import ('@/moudles/errorPage/views/401'),
        name: 'golbalError401',
        meta: { model: 'error', title: '401' }
    },
    {
        path: '/404',
        component: () =>
            import ('@/moudles/errorPage/views/404'),
        name: 'golbalError404',
        meta: { model: 'error', title: '404' }
    },
    // {
    //     path: '/refresh',
    //     component: () =>
    //         import ('@/moudles/tool/views/refresh'),
    //     name: 'refresh',
    //     meta: { model:'refresh',title: 'refresh' }
    // },
    {
        path: '/admin/redirect',
        component: LayoutAdmin,
        hidden: true,
        meta: { model: 'refresh', title: 'refresh' },
        children: [{
            path: '/admin/redirect/:path*',
            component: () =>
                import ('@/moudles/tool/views/refresh'),
            meta: { model: 'refresh', title: 'refresh' }
        }]
    },
]