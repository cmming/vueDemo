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
        height="50px"
        :class='{"fixed":settings.fixedHeader}'
      >
        <Hamburger
          :is-active="menu.collapse"
          @toggleClick="toggleMenu"
        />
        <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />
        <navbar :language="language"></navbar>
      </el-header>

      <tags-view />
      <div class="app-main">
        <router-view />
      </div>

      <right-panel v-if="settings.showSettings">
        <settings />
      </right-panel>

    </el-container>
  </el-container>
</template>
<script>
import { mapGetters } from 'vuex'
import { Sidebar, Navbar, Hamburger, Settings, TagsView } from './components/index'
import RightPanel from '@/components/RightPanel'
import Breadcrumb from '@/components/Breadcrumb'
export default {
  name: 'LayoutAdmin',
  computed: {
    ...mapGetters(['menu', 'language', 'dynamicMenu', 'settings'])
  },
  components: {
    Sidebar,
    Navbar,
    Hamburger,
    RightPanel,
    Settings,
    TagsView,
    Breadcrumb
  },
  mounted () {
    const userId = storage.get('userInfo').info.id
    window.Echo.private(`login.remind.${userId}`).listen('LoginRemind', e => {
    // window.Echo.channel("private-login-remind").listen("LoginRemind", e => {
    // window.Echo.channel("login-remind").listen("LoginRemind", e => {
      // 如果有广播过来你可以进行逻辑操作，比如给用户一个通知
      this.$message({
        type: 'info',
        // message:e.message
        message: e.message ? e.message : '欢迎登录'
      })
    })
  },
  methods: {
    toggleMenu () {
      this.$store.dispatch('toggleSideBar')
    }
  }
}
</script>

<style>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 50px;
}
</style>
