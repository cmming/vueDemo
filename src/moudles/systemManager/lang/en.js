export default {
    langKey: "systemManager",
    lang: {
        role: {
            table: {
                columns: {
                    id: "id",
                    name: "name",
                    description: 'description',

                }
            },
            form: {
                name: {
                    label: 'name'
                },
                description: {
                    label: 'description'
                },
            }
        },
        operationLog: {
            table: {
                columns: {
                    ip: "操作ip",
                    url: "请求url",
                    operation: "操作",
                    params: '参数',
                    response: '请求参数',
                    user_id: '操作用户编号',
                    updated_at:'操作时间'
                }
            },
            form: {
                ip: {
                    label: "操作ip",
                },
            }
        },
    }
}