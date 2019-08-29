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
import request from "@/api/request";
export default {
    computed: {
    ...mapGetters(["operationLog"])
  },
  methods:{
    exportExcel(){
      // requestMap('EXPORT_OPERATIONLOG')
      request({
        url: "/log/export",
        method: "get",
        hasData: false,
        responseType: "arraybuffer"
      }).then(res => {
        if (res.status === 200 && res.data) {
          var disposition = res.headers["content-disposition"];
          var fileName = decodeURI(
            disposition.substring(
              disposition.indexOf("filename=") + 9,
              disposition.length
            )
          );
          let blob = new Blob([res.data], { type: res.headers["content-type"] }); // 假设文件为pdf
          let link = document.createElement("a");
          link.href = window.URL.createObjectURL(blob);
          link.download = fileName;
          link.click();
          link.remove();
        }
      });
    }
  }
}
</script>
