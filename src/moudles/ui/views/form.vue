<template>
  <el-card>
    <el-row>
      <el-col
        :xs="24"
        :sm="18"
        :md="12"
        :lg="8"
        :xl="8"
      >
        <c-form
          ref="cmcm"
          :model="base"
          @querySearchAsync="querySearchAsync"
        ></c-form>
      </el-col>
    </el-row>
  </el-card>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["base"])
  },
  created() {
    this.base.form.items[5].querySearchAsync = this.querySearchAsync
    this.base.form.items[5].handleSelect = this.handleSelect
  },
  methods: {
    querySearchAsync(queryString, cb){
      let result = []
      this.$store.dispatch('getBaseList').then(res=>{
        res.data.map(val=>{
          result.push({value:val.datePicker,id:val.id})
        })
        cb(result)
      })
    },
    // eslint-disable-next-line
    handleSelect(item){
      // console.log(item)
    },
  }
};
</script>

