<template>
  <div class="login-container">
    <div class="login-container-title">
      <span>{{$t('register.title')}}</span>
    </div>
    <el-form ref="form" :model="register" label-position="left">
      <el-form-item prop="name">
        <el-input
          name="name"
          type="text"
          v-model="register.model.name"
          autocomplete="off"
          :placeholder="$t('register.form.name.placeholder')"
          @keyup.enter.native="handleLogin"
          maxlength="30"
        >
          <!-- name -->
          <svg-icon icon-class="name" slot="prefix" />
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
        >
          <!-- name -->
          <svg-icon icon-class="name" slot="prefix" />
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
        >
          <svg-icon icon-class="captcha" slot="prefix" />
        </el-input>
        <el-button type="primary" round @click="sendCode">刷新</el-button>
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
        >
          <svg-icon icon-class="password" slot="prefix" />
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
          <svg-icon icon-class="password" slot="prefix" />
        </el-input>
      </el-form-item>

      <el-form-item class="rember-checkbox" style="background:#fff">
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
      let params = {
        name: this.register.model.name,
        password: this.register.model.password,
        email: this.register.model.email,
        code: this.register.model.code
      };
      this.$store.dispatch("register", params).then(() => {
        this.$router.push("/login");
      });
    },
    sendCode() {
      let params = { email: this.register.model.email };
      this.$store.dispatch("getRegisterCode", params).then(()=>{
        // TODO 验证码发送成功
        this.$message.success('验证码发送成功');
      });
    },
    goToLogin() {
      this.$router.push("/register");
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

