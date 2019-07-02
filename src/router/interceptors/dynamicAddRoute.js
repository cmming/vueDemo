import store from '@/store'

const whiteList = ['/errorPage/401', '/errorPage/404']
// eslint-disable-next-line
export default function dynamicAddRoute(to, from, next,dynamicAddRouteCallBack) {
    console.log(to, from)
    if (_.indexOf(whiteList, to.path) === -1) {
        let routes = fnAddDynamicRoutes(store.getters.routerList)
        dynamicAddRouteCallBack(routes)
        // console.log('加载动态路由', store.getters.routerList, routes)
    }
    next()
    // next({...to,replace:true})
}

function fnAddDynamicRoutes(menuList, routes) {
    function importCompent(menuList) {
        menuList.map(((val, i) => {
            console.log(val)
            try {
                menuList[i]['component'] = () => import(`${val.component}`) || null
                if (menuList[i].children && menuList[i].children.length >= 1) {
                    importCompent(menuList[i].children)
                } else {
                    menuList[i]['children'] = []
                }
            } catch (e) {
                console.log(e)
             }
        }))
    }

    importCompent(menuList)

    return menuList
}