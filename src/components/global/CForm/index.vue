<template>
  <el-form
    :ref="'form_'+model.model_index"
    :rules="model.form.rules"
    :model="model.form.model"
    label-width="80px"
  >
    <!-- fixed prop 关系到 resetField 是否生效 -->
    <el-form-item
      v-for="(item,key) in model.form.items"
      :key="key"
      :label="$t(model.model_index+'.form.'+item.label_key+'.label')"
      :prop="item.prop"
    >
      <template v-if="item.type ==='input'">
        <el-input v-model="model.form.model[item['prop']]"></el-input>
      </template>

      <template v-if="item.type ==='radio'">
        <el-radio-group v-model="model.form.model[item['prop']]">
          <el-radio v-for="(i,k) in item.options" :key="k" :label="i.value">{{i.label}}</el-radio>
        </el-radio-group>
      </template>

      <template v-if="item.type ==='checkbox'">
        <el-checkbox-group v-model="model.form.model[item['prop']]">
          <el-checkbox v-for="(i,k) in item.options" :key="k" :label="i.value">{{i.label}}</el-checkbox>
        </el-checkbox-group>
      </template>

      <template v-if="item.type ==='datePicker'">
        <el-date-picker v-model="model.form.model[item['prop']]"></el-date-picker>
      </template>

      <template v-if="item.type ==='select'">
        <el-select v-model="model.form.model[item['prop']]" placeholder="请选择">
          <el-option
            v-for="item in item.options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </template>
    </el-form-item>

    <el-form-item>
      <el-button
        type="primary"
        @click="onSubmit('form_'+model.model_index)"
      >{{$t('formCommon.submit.label')}}</el-button>
      <el-button @click="resetForm('form_'+model.model_index)">{{$t('formCommon.reset.label')}}</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
  name: "CForm",
  props: {
    model: {
      type: Object,
      required: true,
      default: () => {}
    }
  },
  created() {
    this.dealRules();
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
          // console.log(this.model.form.model)
          // alert("submit!");
          this.$store
            .dispatch(this.model.form.config.api_url, this.model.form.model)
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
      for (var i in this.model.form.rules) {
        this.model.form.rules[i].map(val => {
          //获取lable
          let ruleLable = this.$t(
            this.model.model_index + ".form." + i + ".label"
          );
          // console.log(ruleLable);
          val["message"] = this.$t("validate." + val["message_key"], {
            label: ruleLable
          });
        });
      }
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

