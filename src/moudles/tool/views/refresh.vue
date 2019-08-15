<template>
  <div></div>
</template>
<script>
import storage from "@/utils/storage";
export default {
  created() {
    let preUrl = this.$router.history.pending;
    // 判断用户是否有登录信息
    if (storage.get("vueDemoToken")) {
      if (preUrl) {
        if (preUrl.name == "login") {
          this.$router.push(preUrl.path);
        } else {
          this.$router.push(storage.get("indexPage"));
        }
      } else {
        this.$router.push(storage.get("indexPage"));
      }
    } else {
      this.$router.push("/login");
    }
  }
};
</script>

