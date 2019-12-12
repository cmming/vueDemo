<template>
  <el-container>
    <el-aside
      :width="menu.collapse?'65px':'220px'"
      :class="{'close':menu.collapse,'app-side':true,'app-side-fixed':settings.fixedMenu}"
      :style="{'background-color':settings.menuBg}"
    >
      <sidebar :menuList="dynamicMenu"></sidebar>
    </el-aside>
    <el-container class="app-right">
      <el-header
        class="app-header"
        height="60px"
        :class='{"fixed":settings.fixedHeader}'
      >
        <Hamburger
          :is-active="menu.collapse"
          @toggleClick="toggleMenu"
        />
        <navbar :language="language"></navbar>
      </el-header>

      <tags-view />
      <el-main class="app-main">
        <router-view />
      </el-main>
      
      <right-panel v-if="settings.showSettings">
        <settings />
      </right-panel>

    </el-container>
  </el-container>
</template>
<script>
import { mapGetters } from "vuex";
import { Sidebar, Navbar, Hamburger, Settings, TagsView } from "./components/index";
import RightPanel from '@/components/RightPanel'
export default {
  name: "LayoutAdmin",
  computed: {
    ...mapGetters(["menu", "language", "dynamicMenu","settings"])
  },
  components: {
    Sidebar,
    Navbar,
    Hamburger,
    RightPanel,
    Settings,
    TagsView
  },
  methods: {
    toggleMenu() {
      this.$store.dispatch("toggleSideBar");
    }
  }
};
</script>

<style>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}
</style>