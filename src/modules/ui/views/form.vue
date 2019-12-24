<template>
  <el-card>
    <el-row>
      <el-col
        :xs="24"
        :sm="24"
        :md="24"
        :lg="12"
        :xl="12"
      >
        <c-form
          ref="cmcm"
          :model="base"
          @querySearchAsync="querySearchAsync"
          @onSucces="onSucces"
        ></c-form>
      </el-col>
    </el-row>
  </el-card>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['base'])
  },
  created () {
    this.base.form.items[1].options = [{ value: 'a', label: 'item 1' }, { value: 'b', label: 'item 2' }, { value: 'c', label: 'item 3' }]
    this.base.form.items[2].options = [{ value: 'A1', label: 'A' }, { value: 'B2', label: 'B' }, { value: 'C3', label: 'C' }]
    this.base.form.items[3].options = [{ value: 'A1', label: 'A1' }, { value: 'B1', label: 'B1' }, { value: 'C1', label: 'C1' }]
    this.base.form.items[5].options = [{ key: 'A1', label: 'A1' }, { key: 'B1', label: 'B1' }, { key: 'C1', label: 'C1' }]
    this.base.form.items[6].querySearchAsync = this.querySearchAsync
    this.base.form.items[6].handleSelect = this.handleSelect
  },
  methods: {
    querySearchAsync (queryString, cb) {
      let result = []
      this.$store.dispatch('getBaseList').then(res => {
        res.data.map(val => {
          result.push({ value: val.datePicker, id: val.id })
        })
        cb(result)
      })
    },
    // eslint-disable-next-line
    handleSelect(item){
      // console.log(item)
    },
    onSucces () {
      this.$router.push('/admin/ui/table')
    }
  }
}
</script>
