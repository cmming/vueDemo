<template>
  <el-container>
    <el-aside width="220px" class="app-side">
      <sidebar></sidebar>
    </el-aside>
    <el-container>
      <el-header class="app-header" height="60px">
        <Hamburger></Hamburger>
        <navbar></navbar>
      </el-header>
      
      <el-main class="app-main">
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {
  name: "Layout",
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