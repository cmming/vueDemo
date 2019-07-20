// 修改页面的title
import i18n from '@/lang/index'

export default function changePageTitle(to) {
    if (to.meta.title) {
        document.title = i18n.messages[i18n.locale]['menu'][to.meta.model]&&i18n.messages[i18n.locale]['menu'][to.meta.model][to.meta.title]?i18n.messages[i18n.locale]['menu'][to.meta.model][to.meta.title]:''
    }
}