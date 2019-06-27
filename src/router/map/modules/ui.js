import LayoutAdmin from '@/layout/index.vue'

export default {
    path: '/ui',
    component: LayoutAdmin,
    redirect: 'noRedirect',
    name: 'ui',
    meta: {
        title: 'ui',
        icon: 'table'
    },
    children: [
        {
            path: 'form',
            component: () => import('@/views/ui/form'),
            name: 'form',
            meta: { title: 'form' }
        },
        {
            path: 'table',
            component: () => import('@/views/ui/table'),
            name: 'table',
            meta: { title: 'table' }
        }
    ]
}