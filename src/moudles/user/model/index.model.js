export default {
    model_index: "user",
    table: {
        data: [
        ],
        columns: [
            { label_key: "id", prop: "id" },
            { label_key: "name", prop: "name" },
            { label_key: "age", prop: "age" },
        ],
        commonAction: {
            show: true,
            label_key: 'action',
            list: { action_url: 'getUserList', },
            delete: { show: true, title_key: 'delete_btn', action_url: 'deleteUser', icon_name: '', delete_key: 'id' },
            edit: { show: true, title_key: 'edit', action_url: 'storeUser', icon_name: '', delete_key: 'id' },
            width: '350px',
            columns: [
                { title_key: 'delete', action_url: '', icon_name: '' },
                { title_key: 'edit', action_url: '', icon_name: '' },
            ],
        }
    },

    searchArea: {
        config: {
            api_url: "getUserList"
        },
        model: {
            page: 1,
            page_size: 10,
            name: "",
        },
        items: [
            { label_key: "name", prop: "name", type: "input", placeholder: true },
        ],
        rules: {},
    },

    form: {
        config: {
            api_url: "storeBase"
        },
        model: {
            name: "",
            age: "",
        },
        items: [
            { label_key: "name", prop: "name", type: "input", placeholder: true },
            { label_key: "age", prop: "age", type: "input", placeholder: true },
        ],
        rules: {
            name: [
                { required: true, trigger: 'blur',message_key:"required" },
            ],
            age: [
                { required: true, trigger: 'blur',message_key:"required" },
            ],
        },
    }
}