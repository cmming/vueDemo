<template>
  <div>
    <c-table :model="base">
      <template
        slot="customAction"
        slot-scope="scope"
      >

        <el-button @click="customEvent(scope.dataScope.row)">自定义</el-button>
      </template>
    </c-table>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["base"])
  },
  created() {
    // eslint-disable-next-line
    // console.log(this.base);
  },
  methods: {
    // eslint-disable-next-line
    customEvent(data) {
      //   console.log(scope);
      this.$notify({
        title: "成功",
        message: "自定义事件",
        type: "success"
      });
    }
  }
};
</script>

