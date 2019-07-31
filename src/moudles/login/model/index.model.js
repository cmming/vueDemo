export default {
    model: {
        name: "",
        password: "",
        captcha: "",
        rember_pwd: "",
        ckey:"",
        img:""
    },
    rules: {
        name: [
          { required: true, message: "请输入名字", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
        ],captcha: [
          { required: true, message: "请输入验证码", trigger: "blur" },
        ]
      },
      loginFormError: {
        captcha: ""
      }
}