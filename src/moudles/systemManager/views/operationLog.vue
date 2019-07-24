<template>
  <div>
    <el-card class="m-bottom-sm search-area">
      <search-area :model="operationLog"></search-area>
    </el-card>
    <el-card>
      <c-table :model="operationLog">
      </c-table>
    </el-card>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
    computed: {
    ...mapGetters(["operationLog"])
  },
}
</script>
