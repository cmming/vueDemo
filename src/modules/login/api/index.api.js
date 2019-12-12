export default {
    LOGIN: {
        url: "/auth/login",
        method: "post",
        hasData: true,
    },
    CAPTCHA: {
        url: "/auth/captcha.jpg",
        method: "get",
        hasData: false,
    },
    REFRESH_TOKEN: {
        url: "/auth/refresh",
        method: "post",
        hasData: false,
    },
    USER_INFO: {
        url: "/auth/authorization/user/info",
        method: "post",
        hasData: true,
    },
    REGISTER: {
        url: "/auth/register",
        method: "post",
        hasData: true,
    },
    GET_REGISTER_EMAIL_CODE: {
        url: "/mail/sendMailToRegister",
        method: "post",
        hasData: true,
    },
}