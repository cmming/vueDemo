import store from '@/store'

const whiteList = ['/errorPage/401', '/errorPage/404','/404','/401']
// eslint-disable-next-line
export default function dynamicAddRoute(to, from, next, router, addRoutesAfter) {
    // eslint-disable-next-line
    if (_.indexOf(whiteList, to.path) === -1) {
        if (!router.options.isLoad) {
            store.dispatch('getUserInfo').then((res) => {
                let routes = fnAddDynamicRoutes(store.getters.routerList)

                router.addRoutes(routes)
                let menus = fnAddDynamicMenu(res.routerList)
                store.dispatch('setUserMenu', menus)
                //动态路由加载完成后
                addRoutesAfter(router)
                router.options.isLoad = true
                //确保加载完成
                next({ ...to, replace: true })
                // eslint-disable-next-line
            }).catch(() => {
                //加载动态路由失败
                addRoutesAfter(router)
                router.options.isLoad = true
                //确保加载完成
                next({ ...to, replace: true })
            })

        } else {
            next()
        }
    } else {
        next()
    }
}


function fnAddDynamicRoutes(dynamicRoutes) {
    function importCompent(dynamicRoutes) {
        dynamicRoutes.map(((val) => {
            try {
                //1.必须经过转换成一个零时变量 使用表达式 import
                // 2.同时import 前面必须接一个字符串 否则不认识
                // 3.捕获不存在的组件给其 一个一定存在的组件
                let component = val['component']
                val['component'] = () => {
                    return import(`@/${component}`)
                        .then((component) => { return component })
                        .catch(error => import('@/views/errorPage/404'))

                }
                if (val.children && val.children.length >= 1) {
                    importCompent(val.children)
                } else {
                    val['children'] = []
                }
            } catch (e) {
                console.log(1)
                throw e;
            }
        }))
    }

    importCompent(dynamicRoutes)


    // console.log('%c!<-------------------- 动态(菜单)路由 s -------------------->', 'color:blue')
    // console.log(dynamicRoutes)
    // console.log('%c!<-------------------- 动态(菜单)路由 e -------------------->', 'color:blue')

    return dynamicRoutes
}




function fnAddDynamicMenu(dynamicMenu) {
    let dynamicMenuTmp = [...dynamicMenu]
    function fnAddMenu(dynamicMenuTmps) {
        dynamicMenuTmps.map(val => {
            // eslint-disable-next-line
            _.unset(val, 'component')
            if (val.children && val.children.length >= 1) {
                fnAddMenu(val.children)
            } else {
                val['children'] = []
            }
        })
    }

    fnAddMenu(dynamicMenuTmp)

    return dynamicMenuTmp
}