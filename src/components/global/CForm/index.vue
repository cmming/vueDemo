<template>
  <el-form
    :ref="'form_'+model.model_index"
    :rules="model.form.rules"
    :model="model.form.model"
    :label-width="model.form.config.label_width?model.form.config.label_width:'80px'"
    v-loading="loading"
  >
    <!-- fixed prop 关系到 resetField 是否生效 -->
    <template v-for="(item,key) in model.form.items">
      <el-form-item
        :ref="model.model_index+item['prop']"
        :key="key"
        :label="$t(model.model_index+'.form.'+item.label_key+'.label')"
        :prop="item.prop"
        v-if="formStatus === 'add'||formStatus === 'update'&&item.show_update_form"
        :error="item.error"
      >

        <template v-if="item.type ==='input'">

          <template v-if="formStatus === 'add'||item.can_update">
            <template v-if="item.input_type ==='number'">
              <el-input
                :type="item['input_type']"
                v-model.number="model.form.model[item['prop']]"
                :maxlength="GLOBAL_CONFIG.inputMaxLength"
                onKeypress="return(/[\d]/.test(String.fromCharCode(event.keyCode)))"
              ></el-input>
            </template>

            <template v-else>
              <el-input
                v-model="model.form.model[item['prop']]"
                :maxlength="GLOBAL_CONFIG.inputMaxLength"
              ></el-input>
            </template>
          </template>
          <template v-else>
            {{model.form.model[item['prop']]}}
          </template>

        </template>

        <template v-if="item.type ==='radio'">
          <el-radio-group v-model="model.form.model[item['prop']]">
            <el-radio
              v-for="(i,k) in item.options"
              :key="k"
              :label="i.value"
            >{{i.label}}</el-radio>
          </el-radio-group>
        </template>

        <template v-if="item.type ==='checkbox'">
          <el-checkbox-group v-model="model.form.model[item['prop']]">
            <el-checkbox
              v-for="(i,k) in item.options"
              :key="item['prop']+k"
              :label="i.value"
            >{{i.label}}</el-checkbox>
          </el-checkbox-group>
        </template>

        <template v-if="item.type ==='datePicker'">
          <el-date-picker v-model="model.form.model[item['prop']]" value-format="yyyy-MM-dd"></el-date-picker>
        </template>

        <template v-if="item.type ==='select'">
          <el-select
            v-model="model.form.model[item['prop']]"
            placeholder="请选择"
          >
            <el-option
              v-for="i in item.options"
              :key="item['prop']+i.value"
              :label="i.label"
              :value="i.value"
            ></el-option>
          </el-select>

        </template>

        <!-- 文件上传 -->
        <template v-if="item.type ==='file'">
        </template>

        <!-- autocomplete -->
        <template v-if="item.type ==='autocomplete'">
          <el-autocomplete
            v-model="model.form.model[item['prop']]"
            :fetch-suggestions="item.querySearchAsync"
            :placeholder="item.placeholder"
            @select="item.handleSelect"
          ></el-autocomplete>
        </template>

         <!-- transfer -->
        <template v-if="item.type ==='transfer'">
          <el-transfer
            filterable
            :titles="item.titles?item.titles:[$t('formCommon.transfer.title.uncheck'),$t('formCommon.transfer.title.checkd')]"
            v-model="model.form.model[item['prop']]"
            :data="item.options"
          ></el-transfer>
        </template>

      </el-form-item>
    </template>

    <el-form-item>

      <el-button
        type="primary"
        @click="onSubmit('form_'+model.model_index)"
      >{{$t('formCommon.submit.label')}}</el-button>
      <el-button
        :ref="model.model_index+'rest_btn'"
        @click="resetForm('form_'+model.model_index)"
      >{{$t('formCommon.reset.label')}}</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'CForm',
  props: {
    model: {
      type: Object,
      required: true,
      default: () => {}
    }
  },
  data () {
    return {
      formStatus: 'add',
      formBaseData: ''
    }
  },
  created () {
    this.dealRules()

    this.formBaseData = this.model.form.model

    this.dealJudgeFormStatus(this.$route)
  },
  //
  computed: {
    ...mapGetters(['language', 'loading'])
  },
  methods: {
    onSubmit (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.clearError()
          let actionUrlAndParams = this.dealSubmitUrlAndParams()
          this.$store
            .dispatch(actionUrlAndParams.action, actionUrlAndParams.params)
            .then(res => {
              if (res.status === 201 || res.status === 204) {
                // 成功创建数据的回调
                this.$emit('onSucces')
              } else {
                // 创建失败的回调
                this.$emit('onError')
              }
            })
            .catch(error => {
              // console.log(error)
              if (error.status === 422) {
                let errors = error.data.errors
                Object.keys(errors).map(val => {
                  this.model.form.items.map(v => {
                    if (v.prop === val) {
                      v.error = errors[val].join(';')
                    }
                  })
                })
              }
            })
        } else {
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    dealSubmitUrlAndParams () {
      let result = { action: '', params: {} }
      if (_.split(this.$route.path, '/').indexOf('update') !== -1) {
        result.action = this.model.form.config.update_url
        result.params = {
          ...this.model.form.model,
          resource_id: this.$route.params.id
        }
      } else {
        result.action = this.model.form.config.store_url
        result.params = this.model.form.model
      }

      return result
    },
    clearError () {
      this.model.form.items.map(v => {
        v.error = undefined
      })
    },
    dealRules () {
      for (var i in this.model.form.rules) {
        this.model.form.rules[i].map(val => {
          // 获取lable
          let ruleLable = this.$t(
            this.model.model_index + '.form.' + i + '.label'
          )
          val['message'] = this.$t('validate.' + val['message_key'], {
            label: ruleLable
          })
        })
      }
    },
    dealJudgeFormStatus (path) {
      if (_.split(path.path, '/').indexOf('update') !== -1) {
        this.formStatus = 'update'
        // 请求获取一个的详情
        this.$store.dispatch(this.model.form.config.show_url, {
          resource_id: _.values(this.$route.params)[0]
        })
      } else {
        // 重置
        this.formStatus = 'add'
        this.model.form.model = this.formBaseData
      }
    }
  },
  beforeDestroy () {
    this.resetForm('form_' + this.model.model_index)
    // 清空所有的错误提示
    this.$refs['form_' + this.model.model_index].clearValidate()
    // 清空后台填充再表单中的错误
    this.clearError()
    // this.model.form.model = this.formBaseData;
    this.model.form.model = this.model.form.base_model
  },
  //
  watch: {
    language () {
      this.dealRules()
    },
    $route (to) {
      this.dealJudgeFormStatus(to)
    }
  }
}
</script>
