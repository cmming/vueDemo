<template>
  <div style="float:right">
    <el-dropdown>
      <svg-icon
        icon-class="setting"
        class-name="language-icon"
      ></svg-icon>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>查看</el-dropdown-item>
        <el-dropdown-item>新增</el-dropdown-item>
        <el-dropdown-item>删除</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>

    <el-dropdown>
      <svg-icon
        icon-class="language"
        class-name="language-icon"
      ></svg-icon>

      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>中文</el-dropdown-item>
        <el-dropdown-item>English</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>
<script>
export default {
  name: "Navbar"
};
</script>

