<template>
  <div style="float:right">
    <el-dropdown>
      <div>
        <svg-icon icon-class="setting" class-name="language-icon"></svg-icon>
      </div>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>查看</el-dropdown-item>
        <el-dropdown-item>新增</el-dropdown-item>
        <el-dropdown-item>删除</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>

    <el-dropdown trigger="click" @command="handleLanguageCommand">
      <!-- fixed: Error in callback for watcher "focusing": "TypeError: selfDefine.className.replace is not a function" -->
      <div>
        <svg-icon icon-class="language" class-name="language-icon"></svg-icon>
      </div>

      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="zh">中文</el-dropdown-item>
        <el-dropdown-item command="en">English</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>
<script>
export default {
  name: "Navbar",
  methods: {
    handleLanguageCommand(lang) {
      // console.log(lang,this)
      this.$i18n.locale = lang;
      this.$store.dispatch("setLanguage", lang);

      // this.$router.go(0)
    }
  }
};
</script>

