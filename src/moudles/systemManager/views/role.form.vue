<template>
  <el-card>
    <c-form :model="role"></c-form>
  </el-card>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["role"])
  },
};
</script>

