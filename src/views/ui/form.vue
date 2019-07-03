<template>
  <el-card>
    <c-form :model="base"></c-form>
  </el-card>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["base"])
  },
};
</script>

