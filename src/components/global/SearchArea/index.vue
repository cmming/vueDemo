<template>
  <el-form
    :ref="'form_search'+model.model_index"
    :rules="model.searchArea.rules"
    :model="model.searchArea.model"
    :inline="true"
  >
    <!-- fixed prop 关系到 resetField 是否生效 -->
    <el-form-item
      v-for="(item,key) in model.searchArea.items"
      :key="key"
      :label="$t(model.model_index+'.form.'+item.label_key+'.label')"
      :prop="item.prop"
    >
      <template v-if="item.type ==='input'">
        <el-input v-model="model.searchArea.model[item['prop']]"></el-input>
      </template>

      <template v-if="item.type ==='radio'">
        <el-radio-group v-model="model.searchArea.model[item['prop']]">
          <el-radio v-for="(i,k) in item.options" :key="k" :label="i.value">{{i.label}}</el-radio>
        </el-radio-group>
      </template>

      <template v-if="item.type ==='checkbox'">
        <el-checkbox-group v-model="model.searchArea.model[item['prop']]">
          <el-checkbox v-for="(i,k) in item.options" :key="k" :label="i.value">{{i.label}}</el-checkbox>
        </el-checkbox-group>
      </template>

      <template v-if="item.type ==='datePicker'">
        <el-date-picker v-model="model.searchArea.model[item['prop']]"></el-date-picker>
      </template>

      <template v-if="item.type ==='select'">
        <el-select v-model="model.searchArea.model[item['prop']]" placeholder="请选择">
          <el-option
            v-for="i in item.options"
            :key="item['prop']+i.value"
            :label="i.label"
            :value="i.value"
          ></el-option>
        </el-select>
      </template>
    </el-form-item>

    <el-form-item>
      <el-button
        type="primary"
        @click="onSubmit('form_search'+model.model_index)"
      >{{$t('formCommon.submit.label')}}</el-button>
      <el-button @click="resetForm('form_search'+model.model_index)">{{$t('formCommon.reset.label')}}</el-button>
      <el-button v-if="model.searchArea.config.is_add" type="success" @click="addItem">{{$t('formCommon.add.label')}}</el-button>
      <slot name="btn"></slot>
    </el-form-item>
  </el-form>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
  name: "SearchArea",
  props: {
    model: {
      type: Object,
      required: true,
      default: () => {}
    }
  },
  //
  computed: {
    ...mapGetters(["language"])
  },
  methods: {
    onSubmit(formName) {
      // console.log("submit!");
      this.$refs[formName].validate(valid => {
        if (valid) {
          // console.log(this.model.searchArea.model)
          // alert("submit!");
          this.$store
            .dispatch(this.model.searchArea.config.search_url, this.model.searchArea.model)
            .then(res => {
              if (res.status === 20) {
                //成功创建数据的回调
                this.$emit("on-succes");
              } else {
                //创建失败的回调
                this.$emit("on-error");
              }
            });
        } else {
          // console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    dealRules() {
      for (var i in this.model.searchArea.rules) {
        this.model.searchArea.rules[i].map(val => {
          //获取lable
          let ruleLable = this.$t(
            this.model.model_index + ".searchArea." + i + ".label"
          );
          // console.log(ruleLable);
          val["message"] = this.$t("validate." + val["message_key"], {
            label: ruleLable
          });
        });
      }
    },
    addItem(){
      this.$emit('addItem')
    }
  },
  //
  watch: {
    language() {
      this.dealRules()
    }
  }
};
</script>

