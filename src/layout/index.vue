<template>
  <el-container>
    <el-aside width="220px" :class="{'open':menu.toggleMenu,'app-side':true}">
      <sidebar></sidebar>
    </el-aside>
    <el-container>
      <el-header class="app-header" height="60px">
        <Hamburger :is-active="menu.toggleMenu" @toggleClick="toggleMenu"/>
        <navbar></navbar>
      </el-header>

      <el-main class="app-main">
        <router-view/>
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
    ...mapGetters(["menu"])
  },
  components: {
    Sidebar,
    Navbar,
    Hamburger
  },
  created() {
    // eslint-disable-next-line
    console.log(this.menu, 11111);
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