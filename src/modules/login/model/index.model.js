export default {
  model: {
    name: '',
    password: '',
    captcha: '',
    rember_pwd: '',
    ckey: '',
    img: ''
  },
  rules: {
    name: [
      { required: true, message: '请输入名字', trigger: 'blur' }
    ],
    password: [
      { required: true, message: '请输入密码', trigger: 'blur' }
    ],
    captcha: [
      // { required: true, message: '请输入验证码', trigger: 'blur' }
    ]
  },
  loginFormError: {
    captcha: ''
  },
  items: [
    { label_key: 'name', prop: 'name', type: 'input', placeholder: true, error: '' },
    { label_key: 'password', prop: 'password', type: 'input', placeholder: true, error: '' },
    { label_key: 'captcha', prop: 'captcha', type: 'input', placeholder: true, error: '' }
  ]
}
