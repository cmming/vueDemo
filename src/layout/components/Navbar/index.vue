<template>
  <div style="float:right">


    <screenfull id="screenfull" class="right-menu-item hover-effect" />

    <el-tooltip
      content="Global Size"
      effect="dark"
      placement="bottom"
    >
      <size-select
        id="size-select"
        class="right-menu-item hover-effect"
      />
    </el-tooltip>

    <el-dropdown
    class="right-menu-item hover-effect"
      trigger="click"
      @command="handleLanguageCommand"
    >
      <!-- fixed: Error in callback for watcher "focusing": "TypeError: selfDefine.className.replace is not a function" -->
      <div>
        <svg-icon
          icon-class="language"
          class-name="language-icon"
        ></svg-icon>
      </div>

      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item
          :disabled="language==='zh'"
          command="zh"
        >中文</el-dropdown-item>
        <el-dropdown-item
          :disabled="language==='en'"
          command="en"
        >English</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>
<script>
import { changePageTitle } from "@/router/interceptors/index";
import SizeSelect from "@/components/SizeSelect";
import Screenfull from '@/components/Screenfull'
export default {
  name: "Navbar",
  props: {
    language: {
      type: String,
      required: true,
      default: "zh"
    }
  },
  components: {
    SizeSelect,
    Screenfull
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
      changePageTitle(this.$route);
    }
  }
};
</script>
<style lang="scss" scoped>
.right-menu-item {
  display: inline-block;
  padding: 0 8px;
  height: 100%;
  font-size: 18px;
  color: #5a5e66;
  vertical-align: text-bottom;

  &.hover-effect {
    cursor: pointer;
    transition: background 0.3s;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }
}
</style>


