<template>
  <div>
    <el-card class="m-bottom-sm search-area">
      <search-area :model="base" @addItem="addItem"></search-area>
    </el-card>
    <el-card>
      <c-table :model="base" @editItem="editItem">
        <template slot="customAction" slot-scope="scope">
          <el-button @click="customEvent(scope.dataScope.row)">自定义</el-button>
        </template>
      </c-table>
    </el-card>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['base'])
  },
  created () {
    // eslint-disable-next-line
    // console.log(this.base);
  },
  methods: {
    // eslint-disable-next-line
    customEvent(data) {
      //   console.log(scope);
      this.$notify({
        title: '成功',
        message: '自定义事件',
        type: 'success'
      })
    },
    editItem (data) {
      this.$router.replace({ path: `/admin/ui/form/update/${data.id}` })
    },
    addItem () {
      this.$router.push('/admin/ui/form')
    }
  }
}
</script>
