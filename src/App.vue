<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
import "@/styles/index.scss";
export default {
  name: "app",
  mounted() {
    window.Echo.private("login.remind.1").listen("LoginRemind", e => {
    // window.Echo.channel("private-login-remind").listen("LoginRemind", e => {
    // window.Echo.channel("login-remind").listen("LoginRemind", e => {
      // 如果有广播过来你可以进行逻辑操作，比如给用户一个通知
      console.log(e);
      this.$message({
        type:'info',
        message:e.message
      })
    });
  }
};
</script>
