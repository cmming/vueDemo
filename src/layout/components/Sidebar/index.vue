<template>
  <!-- @open="handleOpen"
  @close="handleClose"-->
  <!-- background-color="#545c64" -->
  <el-menu
    :default-active="activeMenu"
    :collapse="menu.collapse"
    class="app-menu"
    :background-color="settings.menuBg"
    text-color="#fff"
    active-text-color="#ffd04b"
    :router="true"
  >
    <sidebar-item v-for="child in menuList" :key="child.name" :menu="child" :base-path="child.path"></sidebar-item>
  </el-menu>
</template>
<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
export default {
  name: 'Sidebar',
  props: {
    menuList: {
      type: Array,
      default: () => []
    }
  },
  components: {
    SidebarItem
  },
  computed: {
    activeMenu () {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    ...mapGetters(['menu', 'settings'])
  },
  created () {
    // eslint-disable-next-line
    console.log(this.$t("menu.dashborad"));
  },
  method: {}
}
</script>
