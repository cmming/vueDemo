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
                        ,model:'dashborad'
                    },
                    children: [{
                        path: '',
                        component: 'views/dashborad/index',
                        name: 'dashboradIndex',
                        meta: { title: 'dashborad',icon: 'dashboard' ,type:"menu",hidden:false,model:'dashborad'}
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
                        type:"menu",hidden:false,
                        model:'ui'
                    },
                    children: [{
                            path: 'form',
                            component: 'views/ui/form',
                            name: 'form',
                            meta: { title: 'form',icon: 'dashboard' ,type:"menu",hidden:false,model:'ui'}
                        },
                        {
                            path: 'table',
                            component: 'views/ui/table',
                            name: 'table',
                            meta: { title: 'table',icon: 'dashboard' ,type:"menu",hidden:false,model:'ui'}
                        },
                        {
                            path: 'file',
                            component: 'views/ui/file',
                            name: 'file',
                            meta: { title: 'file',icon: 'dashboard' ,type:"menu",hidden:false,model:'ui'}
                        },
                        {
                            path: 'imgCropper',
                            component: 'views/ui/imgCropper',
                            name: 'imgCropper',
                            meta: { title: 'imgCropper',icon: 'dashboard' ,type:"menu",hidden:true,model:'ui'}
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
                        type:"menu",hidden:false,
                        model:'user'
                    },
                    children: [{
                        path: 'user',
                        component: 'modules/user/views/list',
                        name: 'userList',
                        meta: { title: 'userList',icon: 'dashboard' ,type:"menu",hidden:false,model:'user'}
                    },{
                        path: 'user/store',
                        component: 'modules/user/views/form',
                        name: 'userStore',
                        meta: { title: 'userStore',icon: 'dashboard' ,type:"menu",hidden:false,model:'user'}
                    },{
                        path: 'user/update/:post_id',
                        component: 'modules/user/views/form',
                        name: 'userUpdate',
                        meta: { title: 'userUpdate',icon: 'dashboard',type:"menu",hidden:true,model:'user' }
                    }]
                },
            ]
        }
        res.status(200).json(result);
    }
}


module.exports = authorization