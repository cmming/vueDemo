import storage from '@/utils/storage'
import store from '@/store/index'

export default function tokenHandler (config) {
  // Accept-Language：包含语言和权重， 该字段后台和前台都需要单独编写函数去解析，目前使用自建字段
  config.headers = { ...config.headers, Authorization: 'Bearer ' + storage.get('vueDemoToken'), 'lang': store.getters.language }
  return config
}
