import Layout from '@/views/layout'

const constRouter = {
    path: '/table',
    component: Layout,
    redirect: 'noRedirect',
    name: 'table',
    meta: {
        title: 'table',
        icon: 'table'
    },
    children: [{
        path: 'common-table',
        component: () => import('@/views/table/common-table'),
        name: 'common-table',
        meta: { title: 'common-table' }
    }
    ]
}

export default constRouter