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
                        },
                        {
                            path: 'file',
                            component: 'views/ui/file',
                            name: 'file',
                            meta: { title: 'file',icon: 'dashboard' }
                        },
                        {
                            path: 'imgCropper',
                            component: 'views/ui/imgCropper',
                            name: 'imgCropper',
                            meta: { title: 'imgCropper',icon: 'dashboard' }
                        }
                    ]
                },
                {
                    path: '/admin',
                    component: 'layout/index',
                    redirect: 'noRedirect',
                    name: 'user',
                    meta: {
                        title: 'user',
                        icon: 'dashboard'
                    },
                    children: [{
                        path: 'user',
                        component: 'moudles/views/list',
                        name: 'userList',
                        meta: { title: 'userList',icon: 'dashboard' }
                    },{
                        path: 'user/store',
                        component: 'moudles/views/list',
                        name: 'userStore',
                        meta: { title: 'userList',icon: 'dashboard' }
                    },{
                        path: 'user/update',
                        component: 'moudles/views/list',
                        name: 'userUpdate',
                        meta: { title: 'userList',icon: 'dashboard' }
                    }]
                },
            ]
        }
        res.status(200).json(result);
    }
}


module.exports = authorization