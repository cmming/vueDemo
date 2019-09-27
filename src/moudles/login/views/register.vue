<template>
  <div class="login-container">
    <div class="login-container-title">
      <span>{{$t('register.title')}}</span>
    </div>
    <el-form
      ref="registerForm"
      :model="register"
      :rules="register.rules"
      label-position="left"
    >
      <el-form-item prop="name">
        <el-input
          name="name"
          type="text"
          v-model="register.model.name"
          autocomplete="off"
          :placeholder="$t('register.form.name.placeholder')"
          @keyup.enter.native="handleLogin"
          maxlength="30"
          :error="register.items[0].error"
        >
          <!-- name -->
          <svg-icon
            icon-class="name"
            slot="prefix"
          />
        </el-input>
      </el-form-item>

      <el-form-item prop="email">
        <el-input
          name="email"
          type="text"
          v-model="register.model.email"
          autocomplete="off"
          :placeholder="$t('register.form.email.placeholder')"
          @keyup.enter.native="handleLogin"
          maxlength="30"
          :error="register.items[1].error"
        >
          <!-- name -->
          <svg-icon
            icon-class="email"
            slot="prefix"
          />
        </el-input>
      </el-form-item>

      <el-form-item prop="code">
        <el-input
          name="code"
          type="text"
          class="login-captcha"
          v-model="register.model.code"
          autocomplete="off"
          :placeholder="$t('register.form.code.placeholder')"
          @keyup.enter.native="handleLogin"
          maxlength="30"
          :error="register.items[2].error"
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

      <el-form-item prop="password">
        <el-input
          name="password"
          type="password"
          v-model="register.model.password"
          autocomplete="off"
          :placeholder="$t('register.form.password.placeholder')"
          @keyup.enter.native="handleLogin"
          maxlength="30"
          :error="register.items[3].error"
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

      <el-form-item
        class="rember-checkbox"
        style="background:#fff"
      >
        <el-checkbox
          v-model="register.model.rember_pwd"
          fill="#2BAAB1"
        >{{$t('register.form.rember_pwd')}}</el-checkbox>
      </el-form-item>

      <el-form-item>
        <el-button
          type="primary"
          style="width:100%;margin-bottom:30px;"
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
  created() {},
  data() {
    return {
      // login: {
      //   name: "",
      //   password: "",
      //   rember_pwd: "",
      //   ckey: "",
      //   captcha: ""
      // }
    };
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
          // console.log(error);
          if(error.data.errors&&error.data.errors[0]&&error.data.errors[0].code)
          {
            this.$message.error(error.data.errors[0].code);
          }
          let errors = error.data.errors;
          errors.map(val => {
            this.register.items.map(v => {
              if (v.prop === val.field) {
                //  v.error = undefined;
                v.error = val.code;
              }
            });
          });
          return false;
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

