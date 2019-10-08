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
      <el-form-item prop="name">
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

      <el-form-item prop="password">
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
        <img
          class="login-captcha-img"
          :src="login.model.img"
          alt
        />
        <input
          type="text"
          hidden
          v-model="login.model.ckey"
        />
        <el-button
          type="primary"
          round
          @click="refreshCaptcha"
        >刷新</el-button>
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
        >{{$t('login.form.login')}}</el-button>
      </el-form-item>

      <el-form-item>
        <el-button
          type="primary"
          style="width:100%;margin-bottom:30px;"
          @click.native.prevent="goToRegister"
        >{{$t('login.form.register')}}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["login"])
  },
  created() {
    this.$store.dispatch("getCaptcha");
  },
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
    handleLogin() {
      this.$refs["loginForm"].validate(valid => {
        if (valid) {
          this.clearError();
          let params = {
            name: this.login.model.name,
            password: this.login.model.password,
            ckey: this.login.model.ckey,
            captcha: this.login.model.captcha
          };
          this.$store
            .dispatch("login", params)
            .then(() => {
              this.$router.push("/admin/dashborad");
            })
            .catch(error => {
              let errors = error.data.errors;
              errors.map(val => {
                this.login.items.map(v => {
                  if (v.prop === val.field) {
                    //  v.error = undefined;
                    v.error = val.code;
                  }
                });
              });
            });
        } else {
          return false;
        }
      });
    },
    refreshCaptcha() {
      this.$store.dispatch("getCaptcha");
    },
    goToRegister() {
      this.$router.push("/register");
    },
    clearError() {
      this.login.items.map(v => {
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

