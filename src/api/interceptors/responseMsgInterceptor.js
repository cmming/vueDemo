// 根据响应的数据 弹出相对于的消息
import httpStatus from '@/config/statusCode'
import globalConfig from '@/config/globalConfig'
import store from '@/store'
import router from '@/router/index'
import {
    Notification
} from 'element-ui'
import i18n from '@/lang/index'
import request from '@/api/request'
import storage from '@/utils/storage'
import { cancelRequest } from '@/router/interceptors/index'

function openNotificationWithIcon(type, langId, isI18n = true) {
    Notification({
        // title: i18n.messages[i18n.locale]['backstage']['response']['success']['title'],
        message: isI18n ? i18n.messages[i18n.locale]['response'][langId] : langId,
        type: type,
        duration: globalConfig.notificationDuration
    });
}

export default function responseMsgInterceptorHandle(response) {
    let langId = (httpStatus.getMsg(response.status)) + ('.' + response.config.method)
        // console.log(langId)
    if (response.status === httpStatus.HTTP_CREATED) {
        openNotificationWithIcon('success', langId)
    } else if (response.status === httpStatus.HTTP_NO_CONTENT) {
        openNotificationWithIcon('success', langId)
    } else if (response.status === httpStatus.HTTP_NO_FOUND) {
        openNotificationWithIcon('error', response.statusText)
    } else if (response.status === httpStatus.UNAUTHORIZED) {
        // console.log(response.data.message)
        let code = response.data.code
        switch (code) {
            // 过期可以刷新
            case 401001:
                // 取消请求
                cancelRequest()
                store.dispatch('refreshToken').then(() => {
                    request(response.config)
                    const { fullPath } = router.currentRoute
                    router.replace('/admin/redirect' + fullPath)
                }).catch(() => {
                    const { fullPath } = router.currentRoute
                    router.replace('/admin/redirect' + fullPath)
                })
                break;
            case 401005:
                openNotificationWithIcon('error', response.data.message)
                break;
            default:
                storage.remove('vueDemoToken')
                router.push('/login')
                break;
        }
        // if (response.data.code && response.data.code == 401) {
        //     alert(1)

        // } else {
        //     openNotificationWithIcon('error', response.statusText)
        // }
    } else if (response.status === httpStatus.BAD_REQUEST) {
        openNotificationWithIcon('error', response.data.message, false)
    } else {}

}