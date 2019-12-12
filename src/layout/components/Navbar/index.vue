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
      <lang-select class="set-language"></lang-select>
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
import LangSelect from '@/components/LangSelect'
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
    HeaderAvator,
    LangSelect
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
  background: transparent;
  padding: 0;
  margin: 0;
  .admin-header-nav-item {
    margin: 0;
    float: left;
    list-style: none;
    position: relative;
    padding: 0 10px;
    cursor: pointer;
    ::v-deep svg {
      color: #000 !important;
      font-size: 16px !important;
    }
    ::v-deep i {
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
  }
}
</style>


