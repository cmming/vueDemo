<template>
  <el-card>
    <c-form :model="user"></c-form>
  </el-card>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["user"])
  },
};
</script>

