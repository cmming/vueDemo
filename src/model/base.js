export default {
    model_index: "base",
    table: {
        data: [{
                date: "2016-05-03",
                name: "王小虎",
                address: "上海市普陀区金沙江路 1518 弄"
            },
            {
                date: "2016-05-02",
                name: "王小虎",
                address: "上海市普陀区金沙江路 1518 弄"
            },
            {
                date: "2016-05-04",
                name: "王小虎",
                address: "上海市普陀区金沙江路 1518 弄"
            },
            {
                date: "2016-05-01",
                name: "王小虎",
                address: "上海市普陀区金沙江路 1518 弄"
            },
            {
                date: "2016-05-08",
                name: "王小虎",
                address: "上海市普陀区金沙江路 1518 弄"
            },
            {
                date: "2016-05-06",
                name: "王小虎",
                address: "上海市普陀区金沙江路 1518 弄"
            },
            {
                date: "2016-05-07",
                name: "王小虎",
                address: "上海市普陀区金沙江路 1518 弄"
            }
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
            delete: { show: true, title_key: 'delete', action_url: 'getBaseList', icon_name: '' },
            edit: { show: true, title_key: 'edit', action_url: '', icon_name: '' },
            width: '350px',
            columns: [
                { title_key: 'delete', action_url: '', icon_name: '' },
                { title_key: 'edit', action_url: '', icon_name: '' },
            ],
        }
    },

    searchArea: {
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
            { label_key: "email", props: "email", type: "Input", placeholder: true },
            {
                label_key: "radio",
                props: "radio",
                type: "Radio",
                options: [{ value: "a", label: "item 1" }, { value: "b", label: "item 2" }, { value: "c", label: "item 3" }]
            },
            {
                label_key: "checkbox",
                props: "checkbox",
                type: "Checkbox",
                options: [{ value: "A", label: "A" }, { value: "B", label: "B" }, { value: "C", label: "C" }]
            },
            {
                label_key: "select",
                props: "select",
                type: "Select",
                options: [{ value: "A1", label: "A1" }, { value: "B1", label: "B1" }, { value: "C1", label: "C1" }]
            },
            // { label_key: "DatePicker", props: "datePicker", type: "DatePicker", showTime: true, format: "YYYY-MM-DD HH:mm:ss" },
            { label_key: "datePicker", props: "datePicker", type: "DatePicker" },
        ],
        rules: {},
    }
}