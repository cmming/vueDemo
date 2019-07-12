import qs from 'qs'
export default function paramsRequestInterceptors(config) {
    if (
        config.method === "post" ||
        config.method === "put"
        //  ||
        // config.method === "delete"
    ) {
        //{ indices: false } 用来处理传递数组时候的问题
        config.data = qs.stringify(config.data, { indices: false });
    }

    return config
}