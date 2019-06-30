// 根据响应的数据 弹出相对于的消息
import httpStatus from '@/config/statusCode'
import commonConfig from '@/config/commonConfig'
import {
    Notification
} from 'element-ui'
import i18n from '@/lang/index'


function openNotificationWithIcon(type, langId) {
    Notification({
        // title: i18n.messages[i18n.locale]['backstage']['response']['success']['title'],
        message: i18n.messages[i18n.locale]['response'][langId],
        type: type,
        duration: commonConfig.notificationDuration
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
    }
}