<template>
  <el-card>
    <c-form :model="role" @onSucces="onSucces"></c-form>
  </el-card>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['role'])
  },
  methods: {
    onSucces () {
      this.$router.push('/admin/systemManager/role')
    }
  }
}
</script>
