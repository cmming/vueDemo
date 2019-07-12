<template>

  <imp-panel>
    <h3
      class="box-title"
      slot="header"
      style="width: 100%;"
    >
      <el-button
        type="primary"
        suffix-icon="el-icon-plus"
        @click="newAdd"
      >新增</el-button>
      <el-button
        type="danger"
        suffix-icon="el-icon-delete"
        @click="batchDelete"
      >删除</el-button>
      <el-button
        type="success"
        suffix-icon="el-icon-delete"
        @click="createAnsyRouter"
      >生成动态路由</el-button>
      <el-button
        type="success"
        suffix-icon="el-icon-delete"
        @click="npmRunBuild"
        :loading="buildLoading"
      >页面打包</el-button>
    </h3>
    <el-row
      slot="body"
      :gutter="18"
      style="margin-bottom: 20px;"
    >
      <el-col
        :span="6"
        :xs="24"
        :sm="24"
        :md="6"
        :lg="6"
        style="margin-bottom: 20px;"
      >
        <el-tree
          v-loading="loading"
          v-if="menuTree"
          ref="menuTree"
          :data="router.routerList"
          show-checkbox
          highlight-current
          :render-content="renderContent"
          @node-click="handleNodeClick"
          clearable
          node-key="id"
          :props="defaultProps"
        >
        </el-tree>
      </el-col>

      <el-col
        :span="18"
        :xs="24"
        :sm="24"
        :md="18"
        :lg="18"
      >
        <el-card class="box-card">
          <div class="text item">
            <el-form
              :model="form"
              ref="form"
            >
              <el-form-item
                label="父级"
                :label-width="formLabelWidth"
              >
                <!--<el-input v-model="form.parent_id" auto-complete="off"></el-input>-->
                <el-select-tree
                  v-model="form.parent_id"
                  :treeData="router.routerList"
                  :propNames="defaultProps"
                  clearable
                  placeholder="请选择父级"
                >
                </el-select-tree>
              </el-form-item>

              <el-form-item
                label="链接"
                :label-width="formLabelWidth"
              >
                <el-input
                  v-model="form.path"
                  auto-complete="off"
                ></el-input>
              </el-form-item>

              <el-form-item
                label="文件路径"
                :label-width="formLabelWidth"
              >
                <el-input
                  v-model="form.component"
                  auto-complete="off"
                ></el-input>
              </el-form-item>

              <el-form-item
                label="名称"
                :label-width="formLabelWidth"
              >
                <el-input
                  v-model="form.name"
                  auto-complete="off"
                ></el-input>
              </el-form-item>

              <el-form-item
                label="标题"
                :label-width="formLabelWidth"
              >
                <el-input
                  v-model="form.title"
                  auto-complete="off"
                ></el-input>
              </el-form-item>

              <el-form-item
                label="图标"
                :label-width="formLabelWidth"
              >
                <svg-icon :icon-class="form.icon" />
                <el-button
                  type="text"
                  @click="selectIconDialog=true"
                >选择</el-button>
              </el-form-item>

              <el-form-item
                label="类型"
                :label-width="formLabelWidth"
              >
                <el-radio-group v-model="form.type">
                  <el-radio :label="1">菜单</el-radio>
                  <el-radio :label="2">按钮</el-radio>
                </el-radio-group>
              </el-form-item>

              <el-form-item
                label="是否显示"
                :label-width="formLabelWidth"
              >
                <el-radio-group v-model="form.hidden">
                  <el-radio :label="0">显示</el-radio>
                  <el-radio :label="1">不显示</el-radio>
                </el-radio-group>
              </el-form-item>

              <el-form-item
                label="排序"
                :label-width="formLabelWidth"
              >
                <el-slider v-model="form.sort"></el-slider>
              </el-form-item>

              <el-form-item
                label="模型"
                :label-width="formLabelWidth"
              >
                <el-input
                  v-model="form.model"
                  auto-complete="off"
                ></el-input>
              </el-form-item>

              <el-form-item
                label=""
                :label-width="formLabelWidth"
              >
                <el-button
                  type="primary"
                  @click="onSubmit"
                  v-text="form.id?'修改':'新增'"
                ></el-button>
                <el-button
                  type="danger"
                  @click="deleteSelected"
                  suffix-icon="el-icon-delete"
                  v-show="form.id && form.id!=null"
                >删除
                </el-button>
              </el-form-item>
            </el-form>
          </div>
          <el-dialog
            title="选择图标"
            :visible.sync="selectIconDialog"
          >
            <div class="select-tree icons-container">
              <el-scrollbar
                tag="div"
                class='is-empty'
                wrap-class="el-select-dropdown__wrap"
                view-class="el-select-dropdown__list"
              >
                <div class="icons-wrapper">
                  <div
                    v-for="item of iconsMap"
                    :key="item"
                    @click="handleClipboard(item)"
                  >
                    <el-tooltip placement="top">
                      <div slot="content">
                        {{item}}
                        {{generateIconCode(item)}}
                      </div>
                      <div class="icon-item">
                        <svg-icon :icon-class="item" />
                        <span>{{item}}</span>
                      </div>
                    </el-tooltip>
                  </div>
                </div>
              </el-scrollbar>
            </div>
            <span
              slot="footer"
              class="dialog-footer"
            >
              <el-button @click="selectIconDialog = false">取 消</el-button>
              <el-button
                type="primary"
                @click="selectIconDialog = false"
              >确 定</el-button>
            </span>
          </el-dialog>
        </el-card>
      </el-col>
    </el-row>
  </imp-panel>

</template>
<script type="text/babel">
import { mapGetters } from "vuex";
import panel from "@/components/panel.vue";
import selectTree from "@/components/selectTree.vue";
import treeter from "@/components/treeter";
import merge from "element-ui/src/utils/merge";

import icons from "@/components/SvgIcon/generateIconsView";

export default {
  mixins: [treeter],
  components: {
    "imp-panel": panel,
    "el-select-tree": selectTree
  },
  data() {
    return {
      buildLoading: false,
      selectIconDialog: false,
      formLabelWidth: "100px",
      defaultProps: {
        children: "children",
        label: "name",
        id: "id"
      },
      maxId: 7000000,
      menuTree: [],
      form: {
        id: null,
        name: "",
        sort: 0,
        icon: "",
        path: "",
        hidden: "",
        parent_id: 0,
        noCache: 1,
        component: "",
        title: "",
        type: "",
        model: ""
      },
      iconsMap: []
    };
  },
  computed: {
    ...mapGetters(["router","loading"])
  },
  mounted() {
    const iconsMap = icons.state.iconsMap.map(i => {
      return i.default.id.split("-")[1];
    });
    this.iconsMap = iconsMap;
  },
  created() {
    this.load();
  },
  methods: {
    handleClipboard(text) {
      this.selectIconDialog = false;
      this.form.icon = text;
    },
    generateIconCode(symbol) {
      return `<svg-icon icon-class="${symbol}" />`;
    },
    load() {
      let self = this;
      this.$store.dispatch("getRouter").then(data => {
        // console.log(self.router,data)
      });
    },
    selectIcon(event) {
      this.form.icon = event.target.className;
      this.selectIconDialog = false;
    },
    renderContent(h, { node, data, store }) {
      return (
        <span>
          <span>
            <span>
              <svg-icon icon-class={data.icon} />
              &nbsp;{node.label}
            </span>
          </span>
        </span>
      );
    },
    newAdd() {
      this.form = {
        id: null,
        name: "",
        sort: 0,
        icon: "",
        path: "",
        hidden: "",
        parent_id: null
      };
    },
    createAnsyRouter() {
      let self = this;
      this.$store.dispatch("CREATE_ANSY_ROUTER").then(res => {
        // if(res.status==200){
        // self.$router.go(-1)
        // }
      });
    },
    deleteSelected() {
      this.batchDelete();
    },
    batchDelete() {
      var checkKeys = this.$refs.menuTree.getCheckedKeys();
      console.log(checkKeys);
      if (checkKeys == null || checkKeys.length <= 0) {
        this.$message.warning("请选择要删除的资源");
        return;
      }
      this.$confirm("确定删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        let params = {id:checkKeys},
          self = this;
        this.$store
          .dispatch("deleteRouter", params)
          .then(res => {
            this.$message("操作成功");
          })
          .catch(error => {
            this.$message("操作失败");
          });
        self.load();
      });
    },
    handleNodeClick(data) {
      this.form = merge({}, data);
    },
    onSubmit() {
      let params = this.form,
        self = this;
      // 判断是 修改还是添加
      if (this.form.id == null) {
        this.form.id = 0;
      }
      if (this.form.parent_id == null) {
        this.form.parent_id = 0;
      }
      if (this.form.id > 0) {
        this.$store
          .dispatch("updateRouter", { ...params, resource_id: params.id })
          .then(res => {
            // 再次刷新数据
            self.load();
          });
      } else {
        this.$store.dispatch("addRouter", params).then(res => {
          // 再次刷新数据
          self.load();
        });
      }
    },
    npmRunBuild() {
      this.buildLoading = true;
      this.$store.dispatch("NPMRUNDUILD").then(res => {
        this.buildLoading = false;
        this.$notify({
          type: "success",
          title: "系统提示",
          message: "编译成功",
          //不关闭弹框
          duration: 3000
        });
        // this.$message(res.data.msg);
      });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.select-tree .icons-wrapper {
  display: block;
}

.select-tree .is-empty i {
  width: 30px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  display: inline-block;
  cursor: pointer;
}

.select-tree .is-empty i:hover {
  background-color: #0d6aad;
  color: #ffffff;
}
.el-tree {
  border: 1px solid #d1dbe5;
  border-radius: 4px;
  background-color: #fff;
  overflow: hidden;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12), 0 0 6px 0 rgba(0, 0, 0, 0.04);
}
.el-tree-node__content {
  line-height: 36px;
  height: 36px;
  cursor: pointer;
}

.icons-container {
  margin: 10px 20px 0;
  overflow: hidden;
  .icons-wrapper {
    margin: 0 auto;
  }
  .icon-item {
    margin: 20px;
    height: 110px;
    text-align: center;
    width: 110px;
    float: left;
    font-size: 30px;
    color: #24292e;
    cursor: pointer;
  }
  span {
    display: block;
    font-size: 24px;
    margin-top: 10px;
  }
}

/**/
.el-checkbox__inner {
  display: inline-block;
  position: relative;
  border: 1px solid #bfcbd9;
  border-radius: 4px;
  box-sizing: border-box;
  width: 18px;
  height: 18px;
  background-color: #fff;
  z-index: 1;
  transition: border-color 0.25s cubic-bezier(0.71, -0.46, 0.29, 1.46),
    background-color 0.25s cubic-bezier(0.71, -0.46, 0.29, 1.46);
}
.el-checkbox__inner::after {
  box-sizing: content-box;
  content: "";
  border: 2px solid #fff;
  border-left: 0;
  border-top: 0;
  height: 8px;
  left: 5px;
  position: absolute;
  top: 1px;
  -ms-transform: rotate(45deg) scaleY(0);
  transform: rotate(45deg) scaleY(0);
  width: 4px;
  transition: transform 0.15s cubic-bezier(0.71, -0.46, 0.88, 0.6) 0.05s;
  -ms-transform-origin: center;
  transform-origin: center;
}
</style>
