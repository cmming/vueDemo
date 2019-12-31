<template>
  <div class="login-container">
    <div class="login-container-title">
      <span>{{$t('login.title')}}</span>
    </div>
    <el-form
      ref="loginForm"
      :model="login.model"
      label-position="left"
      :rules="login.rules"
    >
      <el-form-item prop="name" :error="login.items[0].error">
        <el-input
          name="name"
          type="text"
          v-model="login.model.name"
          autocomplete="off"
          :placeholder="$t('login.form.name.placeholder')"
          @keyup.enter.native="handleLogin"
          maxlength="30"
        >
          <!-- name -->
          <svg-icon
            icon-class="name"
            slot="prefix"
          />
        </el-input>
      </el-form-item>

      <el-form-item prop="password" :error="login.items[1].error">
        <el-input
          name="password"
          type="password"
          v-model="login.model.password"
          autocomplete="off"
          :placeholder="$t('login.form.password.placeholder')"
          @keyup.enter.native="handleLogin"
          maxlength="30"
        >
          <svg-icon
            icon-class="password"
            slot="prefix"
          />
        </el-input>
      </el-form-item>

      <el-form-item
        prop="captcha"
        :error="login.items[2].error"
        v-show = "showCode>3"
      >
        <el-input
          name="captcha"
          type="text"
          class="login-captcha"
          v-model="login.model.captcha"
          autocomplete="off"
          :placeholder="$t('login.form.captcha.placeholder')"
          @keyup.enter.native="handleLogin"
          maxlength="30"
        >
          <svg-icon
            icon-class="captcha"
            slot="prefix"
          />
        </el-input>
        <div v-loading="codeLoading" @click="refreshCaptcha" style="cursor: pointer;display: inline-block;">
          <img
            class="login-captcha-img"
            :src="login.model.img"
            alt="加载中"
          />
          <input
            type="text"
            hidden
            v-model="login.model.ckey"
          />
        </div>
      </el-form-item>

      <el-form-item
        class="rember-checkbox"
        style="background:#fff"
      >
        <el-checkbox
          v-model="login.model.rember_pwd"
          fill="#2BAAB1"
        >{{$t('login.form.rember_pwd')}}</el-checkbox>
      </el-form-item>

      <el-form-item>
        <el-button
          type="primary"
          style="width:100%;margin-bottom:30px;"
          @click.native.prevent="handleLogin"
          :loading="loginLoading"
        >{{$t('login.form.login')}}</el-button>
      </el-form-item>

      <el-form-item>
        <el-button
          type="primary"
          style="width:100%;margin-bottom:30px;height:40px"
          @click.native.prevent="goToRegister"
        >{{$t('login.form.register')}}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['login'])
  },
  created () {
    // this.$store.dispatch('getCaptcha')
    if (this.showCode > 3) {
      this.refreshCaptcha()
    }
  },
  data () {
    return {
      // login: {
      //   name: "",
      //   password: "",
      //   rember_pwd: "",
      //   ckey: "",
      //   captcha: ""
      // }
      codeLoading: true,
      loginLoading: false,
      showCode: storage.get('showCode') ? storage.get('showCode') : 0
    }
  },
  methods: {
    handleLogin () {
      this.loginLoading = true
      this.$refs['loginForm'].validate(valid => {
        if (valid) {
          this.clearError()
          let params = {
            name: this.login.model.name,
            password: this.login.model.password,
            ckey: this.login.model.ckey,
            captcha: this.login.model.captcha
          }
          this.$store
            .dispatch('login', params)
            .then((res) => {
              this.loginLoading = false
              if (res.status === 200) {
                this.showCode = 0
                storage.set('showCode', this.showCode)
                const loadingFullPage = this.$loading({
                  lock: true,
                  text: this.$t('common.loading'),
                  spinner: 'el-icon-loading',
                  background: 'rgba(0, 0, 0, 0.7)'
                })
                this.$store.dispatch('getUserInfo').then(() => {
                  this.$router.push(storage.get('indexPage'))
                  loadingFullPage.close()
                })
              }
            })
            .catch(error => {
              this.showCode++
              storage.set('showCode', this.showCode)
              this.loginLoading = false
              let errors = error.data.errors
              Object.keys(errors).map(val => {
                this.login.items.map(v => {
                  if (v.prop === val) {
                    v.error = errors[val].join(';')
                  }
                })
              })
            })
        } else {
          return false
        }
      })
    },
    refreshCaptcha () {
      this.codeLoading = true
      this.$store.dispatch('getCaptcha')
      .then(() => {
        this.codeLoading = false
      })
    },
    goToRegister () {
      this.$router.push('/register')
    },
    clearError () {
      this.login.items.map(v => {
        v.error = undefined
      })
    }
  },
  watch: {
    showCode (val) {
      if (val > 3) {
        this.refreshCaptcha()
      }
    }
  }
}
</script>

<style lang="scss">
.login-container {
  padding-top: 20vh;
  width: 368px;
  max-width: 95vw;
  margin: 0 auto;
  .login-container-title {
    text-align: center;
    font-size: 35px;
    margin-bottom: 20px;
  }
  .login-captcha {
    width: 40%;
  }
  .login-captcha-img {
    display: inline-block;
    margin-left: 10px;
    width: 130px;
    vertical-align: bottom;
    background: #dfdfdf;
  }
}
</style>
