export default {
    model: {
        name: "",
        email: "",
        password: "",
        code: "",
        checkPassword: ""
    },
    rules: {
        name: [
            { required: true, message: "请输入名字", trigger: "change" },
        ],
        code: [
            { required: true, message: "请输入验证码", trigger: "change" },
        ],
        password: [
            { required: true, message: "请输入密码", trigger: "change" },
        ],
        email: [
            { required: true, message: "请输入邮箱", trigger: "change" },
        ],
    },
    items: [
        { label_key: "name", prop: "name", type: "input", placeholder: true, error: "" },
        { label_key: "email", prop: "email", type: "input", placeholder: true, error: "" },
        { label_key: "code", prop: "code", type: "input", placeholder: true, error: "" },
        { label_key: "password", prop: "password", type: "input", placeholder: true, error: "" },
        { label_key: "checkPassword", prop: "password", type: "input", placeholder: true, error: "" },
    ]
}