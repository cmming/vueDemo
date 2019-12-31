<template>
  <div>
    <el-table
      ref="multipleTable"
      :data="model.table.data.data"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
      :border="true"
      v-loading="loading"
    >
      <!-- 多选框 -->
      <el-table-column type="selection"></el-table-column>

      <!-- 生成列 -->

      <template>
        <el-table-column
          v-for="(column,column_key) in model.table.columns"
          :key="column_key"
          :label="$t( model.model_index+'.table.columns.'+column.label_key)"
          :prop="column.prop"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <!-- 判断是否有filter -->
            <template
              v-if="column.filter&&column.filter.has"
            >{{ scope.row[column.prop]|changeTableColumns(scope.row,model.model_index,column.prop,column.filter.name) }}</template>

            <template v-else>{{ scope.row[column.prop] }}</template>
          </template>
        </el-table-column>
      </template>

      <!-- 操作按钮 -->

      <el-table-column
        v-if="model.table.commonAction.show"
        align="center"
        :label="$t('tableAction.'+model.table.commonAction.label_key)"
        :width="model.table.commonAction.width?model.table.commonAction.width:'auto'"
      >
        <template slot-scope="scope">
          <!-- 删除 -->
          <el-button
            plain
            v-if="model.table.commonAction.delete&&model.table.commonAction.delete.show"
            type="danger"
            @click="deleteItem(scope.row)"
          >
            <i class="el-icon-delete"></i>
            {{$t('tableAction.delete.'+model.table.commonAction.delete.title_key)}}
          </el-button>

          <!-- 修改 -->
          <el-button
            plain
            v-if="model.table.commonAction.delete&&model.table.commonAction.edit.show"
            type="primary"
            @click="editItem(scope.row)"
          >
            <i class="el-icon-edit"></i>
            {{$t('tableAction.'+model.table.commonAction.edit.title_key)}}
          </el-button>

          <!-- 自定义按钮 -->
          <slot name="customAction" :dataScope="scope"></slot>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <c-pagination
      :model="model"
      @handleCurrentChange="handleCurrentChange"
      @handleSizeChange="handleSizeChange"
    ></c-pagination>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'CTable',
  props: {
    model: {
      type: Object,
      required: true,
      default: () => {}
    }
  },
  computed: {
    ...mapGetters(['loading'])
  },
  data () {
    return {
      multipleSelection: []
    }
  },

  created () {
    this.list()
  },

  methods: {
    list () {
      this.$store.dispatch(
        this.model.table.commonAction.list.action_url,
        this.model.searchArea.model
      )
    },
    deleteItem (row) {
      this.$confirm(
        this.$t('tableAction.delete.confirm.title'),
        this.$t('el.messagebox.title'),
        {
          confirmButtonText: this.$t('el.messagebox.confirm'),
          cancelButtonText: this.$t('el.messagebox.cancel'),
          type: 'warning'
        }
      )
        .then(() => {
          const DELETE_KEY =
            row[this.model.table.commonAction.delete.key]
          this.$store
            .dispatch(this.model.table.commonAction.delete.action_url, {
              resource_id: DELETE_KEY
            })
            .then(res => {
              //
              if (res && (res.status === 200 || res.status === 204)) {
                this.list()
              }
            })
        })
        .catch(() => {
        })
    },
    editItem (row) {
      this.$emit('editItem', row)
    },
    handleSelectionChange (val) {
      this.$emit('handleSelectionChange', val)
      // console.log(val)
      this.multipleSelection = val
    },
    handleCurrentChange (page) {
      // 修改请求参数
      this.model.searchArea.model.page = page
      // console.log(page,this.model.searchArea.model.page)
      this.list()
      // 发送请求
    },
    handleSizeChange (page_size) {
      this.model.searchArea.model.page_size = page_size
      this.list()
    }
  }
}
</script>
