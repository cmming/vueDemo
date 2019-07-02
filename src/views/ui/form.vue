<template>
  <el-card>
    <c-form :model="base"></c-form>
    <c-upload></c-upload>
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

