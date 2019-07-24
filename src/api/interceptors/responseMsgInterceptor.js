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

function openNotificationWithIcon(type, langId) {
    Notification({
        // title: i18n.messages[i18n.locale]['backstage']['response']['success']['title'],
        message: i18n.messages[i18n.locale]['response'][langId],
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
        if (response.data.status_code && response.data.status_code == 401) {
            store.dispatch('refreshToken').then(() => {
                request(response.config)
                router.push('/refresh')
            })
        } else {
            openNotificationWithIcon('error', response.statusText)
        }
    }

}