<template>
  <div>
    <el-card class="m-bottom-sm search-area">
      <search-area :model="operationLog">
        <template slot="btn">
          <el-button @click="exportExcel" type="success">导出excel</el-button>
        </template>
      </search-area>
    </el-card>
    <el-card>
      <c-table :model="operationLog">
      </c-table>
    </el-card>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import requestMap from "@/api/requestMap";
export default {
    computed: {
    ...mapGetters(["operationLog"])
  },
  methods:{
    exportExcel(){
      requestMap('EXPORT_OPERATIONLOG')
    }
  }
}
</script>
