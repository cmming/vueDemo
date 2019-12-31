<template>
  <el-dropdown
    trigger="click"
    class='international'
    @command="handleLanguageCommand"
  >
    <div>
      <svg-icon
        v-show="language==='zh'"
        icon-class="China"
      ></svg-icon>
      <svg-icon
        v-show= "language==='en'"
        icon-class="America"
      ></svg-icon>
    </div>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item
        :disabled="language==='zh'"
        command="zh"
      >
      <svg-icon
        icon-class="China"
      ></svg-icon>
      中文
      </el-dropdown-item>
      <el-dropdown-item
        :disabled="language==='en'"
        command="en"
      ><svg-icon
        icon-class="America"
      ></svg-icon>English</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
import { changePageTitle } from '@/router/interceptors/index'
export default {
  computed: {
    language () {
      return this.$store.getters.language
    }
  },
  methods: {
    handleLanguageCommand (lang) {
      this.$i18n.locale = lang
      this.$store.dispatch('setLanguage', lang)

      this.$message({
        message: lang === 'en' ? 'switch language success' : '切换语言成功',
        type: 'success'
      })
      // 切换标题的语言
      changePageTitle(this.$route)
    }
  }
}
</script>

<style scoped>
.international-icon {
  font-size: 20px;
  cursor: pointer;
  vertical-align: -5px !important;
}
.headerIcon {
  color: #ecf3ff;
}
.loginIcon svg {
  color: #275698;
}
</style>
