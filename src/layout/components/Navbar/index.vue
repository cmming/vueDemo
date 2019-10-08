<template>
  <ul class="admin-header-nav">

    <li class="admin-header-nav-item">
      <screenfull
        id="screenfull"
        class="right-menu-item hover-effect"
      />
    </li>

    <li class="admin-header-nav-item">
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
    </li>

    <li class="admin-header-nav-item">
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
    </li>

    <li class="admin-header-nav-item">
      <header-avator></header-avator>
    </li>
  </ul>
</template>
<script>
import { changePageTitle } from "@/router/interceptors/index";
import SizeSelect from "@/components/SizeSelect";
import Screenfull from "@/components/Screenfull";
import HeaderAvator from "../HeaderAvator/index";
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
    Screenfull,
    HeaderAvator
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
.admin-header-nav {
  float: right;
  height: 100%;
  background: transparent;
  padding: 0;
  margin: 0;
  .admin-header-nav-item {
    margin: 0;
    float: left;
    list-style: none;
    position: relative;
    padding: 0 22px;
    cursor: pointer;
    /deep/ svg {
      color: #000 !important;
      font-size: 16px !important;
    }
    /deep/ i {
      // color: #fff !important;
      color: #000 !important;
      font-size: 16px !important;
    }
    .btn-bell-badge {
      position: absolute;
      right: 16px;
      top: -2px;
      width: 8px;
      height: 8px;
      border-radius: 4px;
      background: #f56c6c;
      color: #fff;
    }
    .avator {
      width: 26px;
      height: auto;
      margin-right: 5px;
      border-radius: 100%;
      vertical-align: middle;
    }
  }
}
</style>


