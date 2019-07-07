<template>
  <div style="float:right">

    <el-dropdown trigger="click" @command="handleLanguageCommand">
      <!-- fixed: Error in callback for watcher "focusing": "TypeError: selfDefine.className.replace is not a function" -->
      <div>
        <svg-icon icon-class="language" class-name="language-icon"></svg-icon>
      </div>

      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item :disabled="language==='zh'" command="zh">中文</el-dropdown-item>
        <el-dropdown-item :disabled="language==='en'" command="en">English</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>
<script>
import { changePageTitle } from '@/router/interceptors/index'
export default {
  name: "Navbar",
  props:{
    language:{
      type:String,
      required:true,
      default:'zh'
    }
  },
  methods: {
    handleLanguageCommand(lang) {
      // console.log(lang,this)
      this.$i18n.locale = lang;
      this.$store.dispatch("setLanguage", lang);

      this.$message({
        message: lang == "en" ? "switch language success" : "切换语言成功",
        type: "success"
      });
      // 切换标题的语言
      changePageTitle(this.$route)
    }
  }
};
</script>

