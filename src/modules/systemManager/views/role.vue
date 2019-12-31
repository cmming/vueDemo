<template>
  <div>
    <el-card class="m-bottom-sm search-area">
      <search-area
        :model="role"
        @addItem="addItem"
      ></search-area>
    </el-card>
    <el-card>
      <c-table
        :model="role"
        @editItem="editItem"
      >
        <template
          slot="customAction"
          slot-scope="scope"
        >
          <el-button
            size="small"
            type="primary"
            @click="addRoleRouter(scope.dataScope.row.id)"
          >
            页面管理
          </el-button>
        </template>
      </c-table>

      <!-- 显示该角色拥有的菜单 -->
      <el-dialog
        title="配置用户角色"
        :visible.sync="dialogVisible"
      >
        <div class="select-tree">
          <el-scrollbar
            tag="div"
            class='is-empty'
            wrap-class="el-select-dropdown__wrap"
            view-class="el-select-dropdown__list"
          >
            <el-tree
              ref="routerTree"
              :data="router.routerList"
              show-checkbox
              check-strictly
              node-key="id"
              v-loading="loading"
              :props="defaultProps"
              :default-expanded-keys="role.routers"
              :default-checked-keys="role.routers"
            >
            </el-tree>
          </el-scrollbar>
        </div>
        <span
          slot="footer"
          class="dialog-footer"
        >
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button
            type="primary"
            @click="configRolesRouter"
          >确 定</el-button>
        </span>
      </el-dialog>

    </el-card>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      dialogVisible: false,
      configRoleId: '',
      defaultProps: {
        children: 'children',
        label: 'title',
        id: 'id'
      }
    }
  },
  computed: {
    ...mapGetters(['role', 'router', 'loading'])
  },
  created () {
    // eslint-disable-next-line
    // console.log(this.base);
  },
  methods: {
    addRoleRouter (index) {
      if (index === '') {
        this.$message.error('请选中一个数据,然后再进行资源配置')
      } else {
        let self = this
        let params = {
          resource_id: index
        }
        this.dialogVisible = true
        this.configRoleId = index
        this.$store.dispatch('getRoleRouter', params).then(res => {
          if (res.status === 200) {
            self.$store.dispatch('getRouter')
          }
        })
      }
    },
    editItem (data) {
      this.$router.push('/admin/systemManager/role/update/' + data.id)
    },
    // 修改 角色的菜单
    configRolesRouter () {
      var router_id_arr = this.$refs.routerTree.getCheckedKeys()
      var self = this
      // router_id_arr.forEach((val, index) => {
      //   addItem["routers_id[" + index + "]"] = val;
      // });
      var paramObj = {
        resource_id: this.configRoleId,
        routers_id: router_id_arr
      }
      this.$store.dispatch('storeRoleRouter', paramObj).then(res => {
        if (res.status === 204) {
          self.dialogVisible = false
        }
      })
    },
    addItem () {
      this.$router.push('/admin/systemManager/role/store')
    }
  }
}
</script>
