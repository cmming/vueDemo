<template>
  <div v-if="!menu.meta.hidden">
    <!-- <template v-for="(menu,key) in menuList"> -->
      <!-- 二级菜单 -->
      <el-submenu
        v-if="menu.children&&menu.children.length>1"
        :index="basePath+menu.name"
        :key="menu.name+'2'+basePath"
        :data-dd="basePath"
        :data-key="basePath+'/'+menu.path"
      >
        <template slot="title">
          <svg-icon :icon-class="menu.meta.icon" class-name="m-rigth-sm" />
          <span>{{$t('menu.'+menu.name)}}</span>
        </template>

        <sidebar-item
          v-for="(child) in menu.children"
          :key="child.name"
          :menu="child"
          :base-path="basePath"
        />
      </el-submenu>

      <!-- 一级菜单 -->
      <el-menu-item
        v-if="!menu.children||menu.children.length==1"
        :index="basePath+'/'+menu.children[0].path"
        :data-ddc="basePath+'/'+menu.children[0].path"
        :key="menu.name+'1'+basePath"
        :data-key="basePath+'/'+menu.path"
      >
        <svg-icon :icon-class="menu.meta.icon" class-name="m-rigth-sm" />
        <!-- <span slot="title">{{menu.meta.title}}</span> -->
        <span slot="title">{{$t('menu.'+menu.name)}}</span>
      </el-menu-item>

       <el-menu-item
        v-if="!menu.children||menu.children.length==0"
        :index="basePath+'/'+menu.path"
        :data-ddcdd="basePath+'/'+menu.path"
        :key="menu.name+'0'+basePath"
        :data-key="basePath+'/'+menu.path"
      >
        <svg-icon :icon-class="menu.meta.icon" class-name="m-rigth-sm" />
        <span slot="title">{{$t('menu.'+menu.name)}}</span>
        <!-- <span slot="title">{{$t('menu.'+menu.meta.title+'.'+menu.children[0].meta.title)}}</span> -->
      </el-menu-item>
    <!-- </template> -->
  </div>
</template>
<script>
export default {
  name: 'SidebarItem',
  props: {
    // route object
    menu: {
      type: Object,
      required: true
    },
    basePath: {
      type: String,
      default: ''
    }
  }
}
</script>
