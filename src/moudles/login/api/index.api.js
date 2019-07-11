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
        url: "/authorization/user/info",
        method: "post",
        hasData: true,
    },
}