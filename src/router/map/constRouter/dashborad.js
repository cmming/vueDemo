import LayoutAdmin from '@/layout/index.vue'

export default {
    path: '/dashborad',
    component: LayoutAdmin,
    redirect: 'noRedirect',
    name: 'dashborad',
    meta: {
        title: 'dashborad',
        icon: 'table'
    },
    children: [
        {
            path: '/dashborad',
            component: () => import('@/views/dashborad/index'),
            name: 'dashboradIndex',
            meta: { title: 'dashborad' }
        }
    ]
}
