export default {
    GET_USER_LIST: {
        url: "/users",
        method: "get",
        hasData: true,
    },
    DELETE_USER: {
        url: "/user",
        method: "delete",
        hasData: true,
    },
    STORE_USER: {
        url: "/user",
        method: "post",
        hasData: true,
    },
    SHOW_USER: {
        url: "/user",
        method: "get",
        hasData: false,
    },

}
