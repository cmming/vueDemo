<template>
  <el-container>
    <el-aside style="width:210px">
      <sidebar />
      <HelloWorld msg="Welcome to Your Vue.js App"/>
    </el-aside>
    <el-container style="width:calc(100% - 200px)">
      <el-header style="text-align: right; font-size: 12px">
        <el-dropdown>
          <i class="el-icon-setting" style="margin-right: 15px"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>查看</el-dropdown-item>
            <el-dropdown-item>新增</el-dropdown-item>
            <el-dropdown-item>删除</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span>王小虎</span>
      </el-header>
      <el-main>
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import { Sidebar } from "./components";
import HelloWorld from '../../components/HelloWorld'
export default {
  name: "Layout",
  components: {
    Sidebar,
    HelloWorld
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
<script>
</script>