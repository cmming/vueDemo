import { validateEmail } from "@/utils/validate";

export default {
    model_index: "base",
    table: {
        data: [
        ],
        columns: [
            { label_key: "id", prop: "id" },
            { label_key: "email", prop: "email" },
            { label_key: "radio", prop: "radio" },
            { label_key: "checkbox", prop: "checkbox" },
            { label_key: "select", prop: "select" },
            { label_key: "datePicker", prop: "datePicker" },
            { label_key: "transfer", prop: "transfer" },
        ],
        commonAction: {
            show: true,
            label_key: 'action',
            list: { action_url: 'getBaseList', },
            delete: { show: true, title_key: 'delete_btn', action_url: 'deleteBase', icon_name: '', key: 'id' },
            edit: { show: true, title_key: 'edit', action_url: 'deleteBase', icon_name: '', key: 'id' },
            width: '350px',
        }
    },

    searchArea: {
        config: {
            search_url: "getBaseList"
        },
        model: {
            page: 1,
            page_size: 10,
            email: "",
            radio: "",
            checkbox: [],
            select: "",
            datePicker: "",
        },
        items: [
            { label_key: "email", prop: "email", type: "input", placeholder: true },
            {
                label_key: "radio",
                prop: "radio",
                type: "radio",
                options: [{ value: "a", label: "item 1" }, { value: "b", label: "item 2" }, { value: "c", label: "item 3" }]
            },
            // { label_key: "DatePicker", prop: "datePicker", type: "DatePicker", showTime: true, format: "YYYY-MM-DD HH:mm:ss" },
            { label_key: "datePicker", prop: "datePicker", type: "datePicker" },
        ],
        rules: {},
    },

    form: {
        config: {
            store_url: "storeBase"
        },
        model: {
            email: "",
            radio: "",
            checkbox: [],
            select: "",
            datePicker: "",
        },
        items: [
            { label_key: "email", prop: "email", type: "input", placeholder: true },
            {
                label_key: "radio",
                prop: "radio",
                type: "radio",
                options: [{ value: "a", label: "item 1" }, { value: "b", label: "item 2" }, { value: "c", label: "item 3" }]
            },
            {
                label_key: "checkbox",
                prop: "checkbox",
                type: "checkbox",
                options: [{ value: "A", label: "A" }, { value: "B", label: "B" }, { value: "C", label: "C" }]
            },
            {
                label_key: "select",
                prop: "select",
                type: "select",
                options: [{ value: "A1", label: "A1" }, { value: "B1", label: "B1" }, { value: "C1", label: "C1" }]
            },
            // { label_key: "DatePicker", prop: "datePicker", type: "DatePicker", showTime: true, format: "YYYY-MM-DD HH:mm:ss" },
            { label_key: "datePicker", prop: "datePicker", type: "datePicker" },
        ],
        rules: {
            email: [
                { required: true, trigger: 'blur',message_key:"required" },
                { validator: validateEmail, trigger: 'blur',message_key:"validateEmail" }
            ],
        },
    }
}