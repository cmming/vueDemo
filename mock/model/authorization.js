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
                        icon: 'dashboard',
                        type:"menu",hidden:false
                    },
                    children: [{
                        path: '',
                        component: 'views/dashborad/index',
                        name: 'dashboradIndex',
                        meta: { title: 'dashborad',icon: 'dashboard' ,type:"menu",hidden:false}
                    }]
                },
                {
                    path: '/admin/ui',
                    component: 'layout/index',
                    redirect: 'noRedirect',
                    name: 'ui',
                    meta: {
                        title: 'ui',
                        icon: 'dashboard',
                        type:"menu",hidden:false
                    },
                    children: [{
                            path: 'form',
                            component: 'views/ui/form',
                            name: 'form',
                            meta: { title: 'form',icon: 'dashboard' ,type:"menu",hidden:false}
                        },
                        {
                            path: 'table',
                            component: 'views/ui/table',
                            name: 'table',
                            meta: { title: 'table',icon: 'dashboard' ,type:"menu",hidden:false}
                        },
                        {
                            path: 'file',
                            component: 'views/ui/file',
                            name: 'file',
                            meta: { title: 'file',icon: 'dashboard' ,type:"menu",hidden:false}
                        },
                        {
                            path: 'imgCropper',
                            component: 'views/ui/imgCropper',
                            name: 'imgCropper',
                            meta: { title: 'imgCropper',icon: 'dashboard' ,type:"menu",hidden:true}
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
                        icon: 'dashboard',
                        type:"menu",hidden:false
                    },
                    children: [{
                        path: 'user',
                        component: 'moudles/user/views/list',
                        name: 'userList',
                        meta: { title: 'userList',icon: 'dashboard' ,type:"menu",hidden:false}
                    },{
                        path: 'user/store',
                        component: 'moudles/user/views/form',
                        name: 'userStore',
                        meta: { title: 'userList',icon: 'dashboard' ,type:"menu",hidden:false}
                    },{
                        path: 'user/update/:post_id',
                        component: 'moudles/user/views/form',
                        name: 'userUpdate',
                        meta: { title: 'userList',icon: 'dashboard',type:"menu",hidden:true }
                    }]
                },
            ]
        }
        res.status(200).json(result);
    }
}


module.exports = authorization