import store from '@/store'

const whiteList = ['/errorPage/401', '/errorPage/404']
    // eslint-disable-next-line
export default function dynamicAddRoute(to, from, next, router, addRoutesAfter) {
    // eslint-disable-next-line
    if (_.indexOf(whiteList, to.path) === -1) {
        if (!router.options.isLoad) {
            store.dispatch('getUserInfo').then((res) => {
                console.log(res)
                let routes = fnAddDynamicRoutes(store.getters.routerList)
                
                router.addRoutes(routes)
                let menus = fnAddDynamicMenu(res.routerList)
                store.dispatch('setUserMenu',menus)
                console.log(menus)
                    //动态路由加载完成后
                addRoutesAfter(router)
                router.options.isLoad = true
                    //确保加载完成
                next({...to, replace: true })
            }).catch(error => {
                console.log(error)
                    //加载动态路由失败
                addRoutesAfter(router)
                router.options.isLoad = true
                    //确保加载完成
                next({...to, replace: true })
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
                let component = val['component']
                val['component'] = () =>
                    import (`@/${component}`)
                if (val.children && val.children.length >= 1) {
                    importCompent(val.children)
                } else {
                    val['children'] = []
                }
            } catch (e) {
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