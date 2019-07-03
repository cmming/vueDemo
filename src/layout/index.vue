<template>
  <el-container>
    <el-aside
      :width="menu.collapse?'65px':'220px'"
      :class="{'close':menu.collapse,'app-side':true}"
    >
      <sidebar :menuList="dynamicMenu"></sidebar>
    </el-aside>
    <el-container class="app-right">
      <el-header
        class="app-header"
        height="60px"
      >
        <Hamburger
          :is-active="menu.collapse"
          @toggleClick="toggleMenu"
        />
        <navbar :language="language"></navbar>
      </el-header>

      <el-main class="app-main">
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import { mapGetters } from "vuex";
import { Sidebar, Navbar, Hamburger } from "./components/index";
export default {
  name: "LayoutAdmin",
  computed: {
    ...mapGetters(["menu","language","dynamicMenu"]),
  },
  components: {
    Sidebar,
    Navbar,
    Hamburger
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