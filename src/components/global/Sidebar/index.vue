<template>
  <!-- @open="handleOpen"
  @close="handleClose"-->
  <div>
    <el-menu
      class="app-menu"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <template v-for="(menu,key) in menuList">

        <!-- 二级菜单 -->
        <el-submenu
          v-if="menu.children&&menu.children.length"
          :index="menu.path"
          :data-d="menu.path"
          :key="key"
        >

          <template slot="title">
            <svg-icon :icon-class="menu.meta.icon" />
            <span>{{$t('menu.'+menu.title+'.title')}}</span>
          </template>

          <el-menu-item
            v-for="(menuItem,k) in menu.children"
            :key="+key+'-'+k"
            :index="menu.path+'/'+menuItem.path"
            :data-d="menu.path+'/'+menuItem.path"
          >
            <svg-icon :icon-class="menu.meta.icon" />
            <span>{{$t('menu.'+menu.title+'.'+menuItem.title)}}</span>
          </el-menu-item>
        </el-submenu>

        <!-- 一级菜单 -->
        <el-menu-item
          v-if="!menu.children||!menu.children.length"
          :index="menu.path"
          :data-d="menu.path"
          :key="key"
        >
          <svg-icon :icon-class="menu.meta.icon" />
          <span slot="title">{{$t('menu.'+menu.title)}}</span>
        </el-menu-item>

      </template>
    </el-menu>
  </div>
</template>
<script>
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
  created() {
    // eslint-disable-next-line
    console.log(this.$t("menu.dashborad"));
  },
  method: {}
};
</script>


