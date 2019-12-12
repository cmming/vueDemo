import store from '@/store'
import storage from '@/utils/storage'
import {
    Notification
} from 'element-ui'
import i18n from '@/lang/index'
import globalConfig from '@/config/globalConfig'

const whiteList = ['/errorPage/401', '/errorPage/404', '/404', '/401', '/register']
    // eslint-disable-next-line
export default function dynamicAddRoute(to, from, next, router, addRoutesAfter) {
    // 用户没有登录信息
    if (!storage.get('vueDemoToken')) {
        if (to.path != '/login' && _.indexOf(whiteList, to.path) === -1) {
            next({ path: "/login" })
        }
        next()

    } else {
        // 用户有登录信息
        // 不是白名单的页面就不需要用户的token信息
        if (_.indexOf(whiteList, to.path) === -1) {
            if (!router.options.isLoad) {
                getUserInfo(to, from, next, router, addRoutesAfter)
            } else {
                // 页面首次自动进入登录页面
                if (to.path == '/login') {
                    let toPath = from.path != '' ? from.path : storage.get('indexPage')

                    next({ path: toPath, replace: true })
                    // router.replace('/admin/redirect' + toPath)
                        // 提示用户 点击 退出按钮退出
                    Notification({
                        // title: i18n.messages[i18n.locale]['backstage']['response']['success']['title'],
                        message: i18n.messages[i18n.locale]['response']['autonLogin'],
                        type: "success",
                        duration: globalConfig.notificationDuration
                    });
                } else {
                    next()
                }
            }
        } else {
            next()
        }
    }
}


function fnAddDynamicRoutes(dynamicRoutes) {
    function importCompent(dynamicRoutes) {
        dynamicRoutes.map(((val) => {
            try {
                //1.必须经过转换成一个零时变量 使用表达式 import
                // 2.同时import 前面必须接一个字符串 否则不认识
                // 3.捕获不存在的组件给其 一个一定存在的组件
                // 4.prefetch  webpackPrefetch  空闲时才会下载
                let component = val['component']
                val['component'] = () => {
                    return import ( /* webpackPrefetch: true */ `@/${component}`)
                        .then((component) => { return component })
                        .catch(() =>
                            import ( /* webpackPrefetch: true */ '@/modules/errorPage/views/404'))
                }
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
        dynamicMenuTmps.map((val) => {
            if (val.meta.type === 'menu') {
                _.unset(val, 'component')
                if (val.children && val.children.length >= 1) {
                    fnAddMenu(val.children)
                } else {
                    val['children'] = []
                }
            } else {
                _.pull(dynamicMenuTmps, val)
            }
        })
    }

    fnAddMenu(dynamicMenuTmp)

    return dynamicMenuTmp
}



// eslint-disable-next-line
async function getUserInfo(to, from, next, router, addRoutesAfter) {
    await store.dispatch('getUserInfo').then((res) => {
            let routes = fnAddDynamicRoutes(store.getters.routerList)

            router.addRoutes(routes)
            let menus = fnAddDynamicMenu(res.routerList)
            store.dispatch('setUserMenu', menus)
                //动态路由加载完成后
            addRoutesAfter(router)
            router.options.isLoad = true
                //确保加载完成
            if (to.path == '/login') {
                next({ path: res.indexPage, replace: true })
            } else {
                next({...to, replace: true })
            }
            // eslint-disable-next-line
        })
        // .catch(() => {
        //     storage.remove('vueDemoToken')
        //         //加载动态路由失败
        //     addRoutesAfter(router)
        //         // router.options.isLoad = true
        //         //确保加载完成
        //     next({ path: "/login" })
        // })
}