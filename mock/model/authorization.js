const authorization = {
    info: (req, res) => {
        let result = {
            routerList: [{
                    path: '/admin/dashborad',
                    component: 'layout/index',
                    redirect: 'noRedirect',
                    name: 'dashborad',
                    meta: {
                        title: 'dashborad',
                        icon: 'dashboard'
                    },
                    children: [{
                        path: '',
                        component: 'views/dashborad/index',
                        name: 'dashboradIndex',
                        meta: { title: 'dashborad',icon: 'dashboard' }
                    }]
                },
                {
                    path: '/admin/ui',
                    component: 'layout/index',
                    redirect: 'noRedirect',
                    name: 'ui',
                    meta: {
                        title: 'ui',
                        icon: 'dashboard'
                    },
                    children: [{
                            path: 'form',
                            component: 'views/ui/form',
                            name: 'form',
                            meta: { title: 'form',icon: 'dashboard' }
                        },
                        {
                            path: 'table',
                            component: 'views/ui/table',
                            name: 'table',
                            meta: { title: 'table',icon: 'dashboard' }
                        }
                    ]
                }
            ]
        }
        res.status(200).json(result);
    }
}


module.exports = authorization