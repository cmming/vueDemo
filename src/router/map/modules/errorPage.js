import LayoutAdmin from '@/layout/index.vue'

export default {
    path: '/errorPage',
    component: LayoutAdmin,
    redirect: 'noRedirect',
    name: 'errorPage',
    meta: {
        title: 'ui',
        icon: 'table'
    },
    children: [
        {
            path: '401',
            component: () => import('@/views/errorPage/401'),
            name: '401',
            meta: { title: 'form' }
        },
        {
            path: '404',
            component: () => import('@/views/errorPage/404'),
            name: '404',
            meta: { title: 'table' }
        }
    ]
}