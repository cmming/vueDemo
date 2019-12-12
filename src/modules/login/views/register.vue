<template>
  <div class="login-container">
    <div class="login-container-title">
      <span>{{$t('register.title')}}</span>
    </div>
    <el-form
      ref="registerForm"
      :model="register.model"
      :rules="register.rules"
      label-position="left"
    >
      <el-form-item prop="name" :error="register.items[0].error">
        <el-input
          type="text"
          v-model="register.model.name"
          autocomplete="off"
          :placeholder="$t('register.form.name.placeholder')"
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

      <el-form-item prop="email" :error="register.items[1].error">
        <el-input
          type="text"
          v-model="register.model.email"
          autocomplete="off"
          :placeholder="$t('register.form.email.placeholder')"
          @keyup.enter.native="handleLogin"
          maxlength="30"
        >
          <!-- name -->
          <svg-icon
            icon-class="email"
            slot="prefix"
          />
        </el-input>
      </el-form-item>

      <el-form-item prop="code" :error="register.items[2].error">
        <el-input
          type="text"
          class="login-captcha"
          v-model="register.model.code"
          autocomplete="off"
          :placeholder="$t('register.form.code.placeholder')"
          @keyup.enter.native="handleLogin"
          maxlength="30"
        >
          <svg-icon
            icon-class="captcha"
            slot="prefix"
          />
        </el-input>
        <el-button
          type="primary"
          round
          @click="sendCode"
        >发送</el-button>
      </el-form-item>

      <el-form-item prop="password" :error="register.items[3].error">
        <el-input
          type="password"
          v-model="register.model.password"
          autocomplete="off"
          :placeholder="$t('register.form.password.placeholder')"
          @keyup.enter.native="handleLogin"
          maxlength="30"
        >
          <svg-icon
            icon-class="password"
            slot="prefix"
          />
        </el-input>
      </el-form-item>

      <el-form-item prop="checkPassword">
        <el-input
          name="checkPassword"
          type="password"
          v-model="register.model.checkPassword"
          autocomplete="off"
          :placeholder="$t('register.form.checkPassword.placeholder')"
          @keyup.enter.native="handleLogin"
          maxlength="30"
        >
          <svg-icon
            icon-class="password"
            slot="prefix"
          />
        </el-input>
      </el-form-item>

      <el-form-item>
        <el-button
          type="primary"
          style="width:100%;margin:30px 0;"
          @click.native.prevent="handleRegister"
        >{{$t('register.form.register')}}</el-button>
      </el-form-item>

      <el-form-item>
        <el-button
          type="primary"
          style="width:100%;margin-bottom:30px;"
          @click.native.prevent="goToLogin"
        >{{$t('register.form.login')}}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["register"])
  },
  created(){
    var validatePass2 = (rule, value, callback) => {
        if (value === '') {
            callback(new Error('请再次输入密码'));
        } else if (value !== this.register.model.password) {
            callback(new Error('两次输入密码不一致!'));
        } else {
            callback();
        }
    };
    this.register.rules['checkPassword'] = [{ required: true, validator: validatePass2, trigger: "change" }]
  },
  methods: {
    handleRegister() {
      this.$refs["registerForm"].validate(valid => {
        if (valid) {
          this.clearError();
          let params = {
            name: this.register.model.name,
            password: this.register.model.password,
            email: this.register.model.email,
            code: this.register.model.code
          };
          this.$store.dispatch("register", params).then(() => {
            this.$message.success("注册成功，请登录");
            this.$router.push("/login");
          }).catch(error=>{
            if (error.status === 422) {
              let errors = error.data.errors;
                Object.keys(errors).map(val => {
                  this.register.items.map(v => {
                  if (v.prop === val) {
                      v.error = errors[val].join(';');
                    }
                  });
                })
            }
          });
        } else {
          return false;
        }
      });
    },
    sendCode() {
      let params = { email: this.register.model.email };
      this.clearError();
      this.$store
        .dispatch("getRegisterCode", params)
        .then(() => {
          // TODO 验证码发送成功
          this.$message.success("验证码发送成功");
        })
        .catch(error => {
          if (error.status === 422) {
            let errors = error.data.errors;
              Object.keys(errors).map(val => {
                this.register.items.map(v => {
                if (v.prop === val) {
                    v.error = errors[val].join(';');
                  }
                });
              })
          }
        });
    },
    goToLogin() {
      this.$router.push("/login");
    },
    clearError() {
      this.register.items.map(v => {
        v.error = undefined;
      });
    }
  }
};
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
    margin-left: 5%;
    width: 30%;
    vertical-align: bottom;
    background: #dfdfdf;
  }
}
</style>

