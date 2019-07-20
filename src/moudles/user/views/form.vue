<template>
  <el-card>
    <c-form :model="user" @formCreated="formCreated"></c-form>
  </el-card>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["user", "role", "loading"])
  },
  created() {
    // this.formCreated();
  },
  methods: {
    formCreated() {
      console.log(1);
      //获取用户的角色
      this.$store.dispatch("getRoles").then(res => {
        this.user.form.items[3].options = [];
        // console.log(this.user.form.items[3]);
        this.role.table.data.data.map(val => {
          this.user.form.items[3].options.push({
            value: val.id,
            label: val.name
          });
          this.$forceUpdate()
          // this.$router.push('/refresh')
        });
      });
    }
  }
};
</script>

