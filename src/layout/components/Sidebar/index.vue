<template>
  <!-- @open="handleOpen"
  @close="handleClose"-->
  <el-menu
    :default-active="activeMenu"
    :collapse="menu.collapse"
    class="app-menu"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    :router="true"
  >
    <template v-for="(menu,key) in menuList">
      <!-- 二级菜单 -->
      <el-submenu
        v-if="menu.children&&menu.children.length"
        :index="'/'+menu.path"
        :data-d="menu.path"
        :key="key"
      >
        <template slot="title">
          <svg-icon :icon-class="menu.meta.icon" class-name="m-rigth-sm"/>
          <span>{{$t('menu.'+menu.title+'.title')}}</span>
        </template>

        <el-menu-item
          v-for="(menuItem,k) in menu.children"
          :key="+key+'-'+k"
          :index="'/'+menu.path+'/'+menuItem.path"
          :data-d="menu.path+'/'+menuItem.path"
        >
          <svg-icon :icon-class="menu.meta.icon" class-name="m-rigth-sm"/>
          <span>{{$t('menu.'+menu.title+'.'+menuItem.title)}}</span>
        </el-menu-item>
      </el-submenu>

      <!-- 一级菜单 -->
      <el-menu-item
        v-if="!menu.children||!menu.children.length"
        :index="'/'+menu.path"
        :data-d="menu.path"
        :key="key"
      >
        <svg-icon :icon-class="menu.meta.icon" class-name="m-rigth-sm"/>
        <span slot="title">{{$t('menu.'+menu.title)}}</span>
      </el-menu-item>
    </template>
  </el-menu>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "Sidebar",
  data() {
    return {
      menuList: [
        {
          title: "dashborad",
          path: "dashborad",
          meta: { icon: "dashboard" }
        },
        {
          title: "ui",
          path: "ui",
          meta: { icon: "dashboard" },
          children: [
            {
              title: "table",
              path: "table",
              meta: { icon: "dashboard" }
            },
            {
              title: "form",
              path: "form",
              meta: { icon: "dashboard" }
            }
          ]
        }
      ]
    };
  },
  computed: {
    activeMenu() {
      const route = this.$route;
      const { meta, path } = route;
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu;
      }
      return path;
    },
    ...mapGetters(["menu"])
  },
  created() {
    // eslint-disable-next-line
    console.log(this.$t("menu.dashborad"));
  },
  method: {}
};
</script>


