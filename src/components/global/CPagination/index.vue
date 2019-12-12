<template>
  <el-row
    v-if="model.table.data.meta&&model.table.data.meta.pagination"
    class="m-top-sm"
    :gutter="0"
    style="width: 100%;"
  >
    <!-- pc 端 -->
    <el-col
      :lg="24"
      :xs="0"
      class="over-flow-auto hidden-xs-only"
      style="text-align: center;"
    >
      <div class="pagination-container">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="model.table.data.meta.pagination.current_page"
          :page-sizes="[10,15,30, 50]"
          :page-size="model.table.data.meta.pagination.per_page"
          layout="total, sizes, prev, pager, next, jumper"
          :total="model.table.data.meta.pagination.total"
        >
        </el-pagination>
      </div>
    </el-col>
    <!-- 移动端 -->
    <el-col
      :lg="0"
      :xs="24"
      class="over-flow-auto hidden-sm-and-up"
    >
      <div class="pagination-container">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="model.table.data.meta.pagination.current_page"
          :page-sizes="[10,15,30, 50]"
          :page-size="model.table.data.meta.pagination.per_page"
          layout="prev, pager, next"
          :total="model.table.data.meta.pagination.total"
        >
        </el-pagination>
      </div>
    </el-col>
  </el-row>
</template>
<script>
import 'element-ui/lib/theme-chalk/display.css'
export default {
  name: "CPagination",
  props: {
    model: {
      type: Object,
      required: true,
      default: () => {}
    }
  },
  methods: {
    //   页面的大小发送变化
    handleSizeChange(page_size) {
      this.$emit("handleSizeChange", page_size);
    },
    // 页面的页数发生变化
    handleCurrentChange(page) {
      this.$emit("handleCurrentChange", page);
    }
  }
};
</script>

