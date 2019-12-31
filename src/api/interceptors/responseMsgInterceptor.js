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
import { getUrlAllParams } from '@/utils'

function openNotificationWithIcon (type, langId) {
  Notification({
    // title: i18n.messages[i18n.locale]['backstage']['response']['success']['title'],
    message: i18n.messages[i18n.locale]['response'][langId] ? i18n.messages[i18n.locale]['response'][langId] : langId,
    type: type,
    duration: globalConfig.notificationDuration
  })
}

export default function responseMsgInterceptorHandle (response) {
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
          // fix baseURL重叠
          response.config.baseURL = ''
          response.config.data = getUrlAllParams(response.config.data)
          // 重新上次的请求
          request(response.config).then(() => {
            let prePath = window.location.hash.replace('#', '')
            router.replace({ path: '/redirect' + prePath === '/login' ? storage.get('indexPage') : prePath })
          })
        })
        break
      case 401005:
        store.dispatch('logout')
        router.replace({ path: '/redirect/login' })
        openNotificationWithIcon('error', response.data.message)
        break
      default:
        storage.remove('vueDemoToken')
        router.push('/login')
        break
    }
  } else if (response.status === httpStatus.BAD_REQUEST) {
    openNotificationWithIcon('error', response.data.message, false)
  }
}
