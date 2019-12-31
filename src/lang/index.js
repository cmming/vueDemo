import Vue from 'vue'
import VueI18n from 'vue-i18n'
import elementEnLocale from 'element-ui/lib/locale/lang/en' // element-ui lang
import elementZhLocale from 'element-ui/lib/locale/lang/zh-CN' // element-ui lang
import ElementLocale from 'element-ui/lib/locale'
import enLocale from './en/index'
import zhLocale from './zh/index'
import storage from '@/utils/storage'
import { getLanguage } from '@/utils/function'

Vue.use(VueI18n)

const messages = {
  en: {
    ...enLocale,
    ...elementEnLocale
  },
  zh: {
    ...zhLocale,
    ...elementZhLocale
  }
}
// eslint-disable-next-line
console.log(messages)
const i18n = new VueI18n({
  locale: storage.get('app-language') || getLanguage(), // set locale
  messages // set locale messages
})

// 导入elementui 的样式
ElementLocale.i18n((key, value) => i18n.t(key, value))

export default i18n
