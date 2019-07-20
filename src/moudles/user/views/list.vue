<template>
  <div>
    <el-card class="m-bottom-sm search-area">
      <search-area :model="user"></search-area>
    </el-card>
    <el-card>
      <c-table :model="user" @editItem="editItem">
        <template slot="customAction" slot-scope="scope">
          <el-button @click="setRoles(scope.dataScope.row)">角色管理</el-button>
        </template>
      </c-table>
    </el-card>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["user"])
  },
  created() {
    // eslint-disable-next-line
    // console.log(this.base);
  },
  methods: {
    // eslint-disable-next-line
    setRoles(data) {
      //   console.log(scope);
      this.$notify({
        title: "成功",
        message: "自定义事件",
        type: "success"
      });
    },
    editItem(data){
      this.$router.push('/admin/user/update/'+data.id)
    }
  }
};
</script>

