export default {
    ALL_ROUTER: {
        url: "/router",
        method: "get",
        hasData: false,
    },
    SHOW_ROUTER: {
        url: "/router",
        method: "get",
        hasData: false,
    },
    UPDATE_ROUTER: {
        url: "/router",
        method: "put",
        hasData: true,
    },
    DELETE_ROUTER: {
        url: "router",
        method: "delete",
        hasData: true,
    },
    STORE_ROUTER: {
        url: "/router",
        method: "post",
        hasData: true,
    },
    //角色相关接口
    ROLES:{
        url: "/role",
        method: "get",
        hasData: true,
    },
    SHOW_ROLE:{
        url: "/role",
        method: "get",
        hasData: false,
    },
    UPDATE_ROLE:{
        url: "/role",
        method: "PUT",
        hasData: true,
    },
    STORE_ROLE:{
        url: "/role",
        method: "post",
        hasData: true,
    },
    //危险操作 最后添加
    DELETE_ROLE:{
        url: "/role",
        method: "delete",
        hasData: true,
    },
    ROLE_ROUTER:{
        url: "/role/routers",
        method: "get",
        hasData: true,
    },
    STORE_ROLE_ROUTER:{
        url: "/role/routers",
        method: "put",
        hasData: true,
    },
    // OperationLog
    OPERATIONLOGS:{
        url: "/log",
        method: "get",
        hasData: true,
    },
    DELETE_OPERATIONLOG:{
        url: "/log",
        method: "delete",
        hasData: false,
    },
    EXPORT_OPERATIONLOG:{
        url: "/log/export",
        method: "get",
        hasData: false,
    },
}