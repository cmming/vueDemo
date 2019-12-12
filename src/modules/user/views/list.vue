<template>
  <div>
    <el-card class="m-bottom-sm search-area">
      <search-area
        :model="user"
        @addItem="addItem"
      >
        <template slot="btn">
          <el-button
            @click="exportExcel"
            type="success"
          >导出excel</el-button>
        </template>
      </search-area>
    </el-card>
    <el-card>
      <c-table
        :model="user"
        @editItem="editItem"
      >
        <template
          slot="customAction"
          slot-scope="scope"
        >
          <el-button v-show="false" @click="setRoles(scope.dataScope.row)">角色管理</el-button>
        </template>
      </c-table>
    </el-card>
    <!-- <vitual-form :action="action" ref="exportExcel"></vitual-form> -->
    <form
      :action="action"
      method="get"
      style="display:none"
      target="hideIframe"
    >
      <input
        type="submit"
        ref="downloadBtn"
      >
    </form>
    <iframe
      name="hideIframe"
      src="about:blank"
      style="display:none;"
    ></iframe>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import request from "@/api/request";
// import VitualForm from "./vitualForm";
export default {
  computed: {
    ...mapGetters(["user"])
  },
  components: {
    // VitualForm
  },
  data() {
    return {
      action: process.env.VUE_APP_BASE_API + "/user/export"
    };
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
    editItem(data) {
      this.$router.push("/admin/user/update/" + data.id);
    },
    addItem() {
      this.$router.push("/admin/user/store");
    },
    exportExcel() {
      request({
        url: "/user/export",
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
      // requestMap("EXPORT_USER").then(res => {
      //   console.log(res);
      //   //  var a = document.createElement("a");
      //   // a.href = res.data;
      //   // a.download = 11;
      //   // document.body.appendChild(a);
      //   // a.click();
      //   // a.remove();
      // });
      // this.jumpDownload();
      // console.log(this.$refs["downloadBtn"]);
      // this.$refs["downloadBtn"].click();
    }
  }
};
</script>

