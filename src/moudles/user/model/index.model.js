import ModelGenerator from "@/model/ModelGenerator"
import requestMap from "@/api/requestMap";

class User extends ModelGenerator {
    constructor() {
        let model_name = 'user'
        let columns = [
            { label_key: 'id', prop: 'id', type: 'input', default_value: '', data_roles: '', show_table: true, show_form: false, show_update_form: false, show_search: false, input_type: '', placeholder: '' },
            { label_key: 'name', prop: 'name', type: 'input', default_value: '', data_roles: 'required', show_table: true, show_form: true, show_update_form: true, show_search: true, input_type: '', placeholder: '' },
            { label_key: 'email', prop: 'email', type: 'input', default_value: '', data_roles: 'required|validateEmail', show_table: true, show_form: true, show_update_form: true, show_search: false, input_type: '', placeholder: '', can_update: false },
            // password
            { label_key: 'password', prop: 'password', type: 'input', default_value: '', data_roles: 'required', show_table: false, show_form: true, show_update_form: false, show_search: false, input_type: 'password', placeholder: '' },
            //角色
            { label_key: 'roles', prop: 'roles', type: 'checkbox', default_value: [], data_roles: '', show_table: false, show_form: true, show_update_form: true, show_search: false, input_type: '', placeholder: '' },
        ]
        super(model_name, columns)

        this.setActionUrl()

        this.getRoles({ page_size: 10000000 })

    }

    setActionUrl() {
        this.table.commonAction.list.action_url = 'getUserList'
        this.table.commonAction.delete.action_url = 'deleteUser'
        this.table.commonAction.edit.action_url = 'storeUser'

        this.searchArea.config.search_url = 'getUserList'
        this.searchArea.config.is_add = true

        this.form.config.store_url = 'storeUser'
        this.form.config.show_url = 'showUser'
        this.form.config.update_url = 'updateUser'

        // 渲染角色

    }

    async getRoles(params) {
        this.form.items[3].options = [];
        await requestMap('ROLES', params).then(response => {
            response.data.data.map(val => {
                this.form.items[3].options.push({
                    value: val.id,
                    label: val.name
                });
            })
        })
    }

}

export default new User().model

// console.log(new user())
// let demoColumns = [
//     { label_key: 'id', prop: 'id', type: 'input', default_value: '', data_roles: '', show_table: true, show_form: false, show_update_form: false, show_search: false, input_type: '', placeholder: '' },
//     { label_key: 'name', prop: 'name', type: 'input', default_value: '', data_roles: 'required', show_table: true, show_form: true, show_update_form: true, show_search: true, input_type: '', placeholder: '' },
//     { label_key: 'age', prop: 'age', type: 'input', default_value: '', data_roles: 'validateNumberRequired', show_table: true, show_form: true, show_update_form: true, show_search: false, input_type: 'number', placeholder: '' },
// ]
// let demo = new ModelGenerator('user', demoColumns, 'id')
// let data_model = demo.model

// data_model.table.commonAction.list.action_url = 'getUserList'
// data_model.table.commonAction.delete.action_url = 'deleteUser'
// data_model.table.commonAction.edit.action_url = 'storeUser'


// data_model.searchArea.config.search_url = 'getUserList'

// data_model.form.config.store_url = 'storeUser'
// data_model.form.config.show_url = 'showUser'
// data_model.form.config.update_url = 'showUser'

// console.log(data_model)

// export default data_model

// export default {
//     model_index: "user",
//     table: {
//         data: [],
//         columns: [
//             { label_key: "id", prop: "id" },
//             { label_key: "name", prop: "name" },
//             { label_key: "age", prop: "age" },
//         ],
//         commonAction: {
//             show: true,
//             label_key: 'action',
//             list: { action_url: 'getUserList', },
//             delete: { show: true, title_key: 'delete_btn', action_url: 'deleteUser', icon_name: '', key: 'id' },
//             edit: { show: true, title_key: 'edit', action_url: 'storeUser', icon_name: '', key: 'id' },
//             width: '350px',
//         }
//     },

//     searchArea: {
//         config: {
// search_url: "getUserList"
//         },
//         model: {
//             page: 1,
//             page_size: 10,
//             name: "",
//         },
//         items: [
//             { label_key: "name", prop: "name", type: "input", placeholder: true },
//         ],
//         rules: {},
//     },

//     form: {
//         config: {
//             store_url: "storeUser",
//             show_url: "showUser",
//             update_url: "showUser",
//         },
//         model: {
//             name: "",
//             age: "",
//         },
//         items: [
//             { label_key: "name", prop: "name", type: "input", placeholder: true },
//             { label_key: "age", prop: "age", type: "input", input_type: "number", placeholder: true },
//         ],
//         rules: {
//             name: [
//                 { required: true, trigger: 'blur', message_key: "required" },
//             ],
//             age: [
//                 { validator: validateNumber, required: true, trigger: 'blur', message_key: "validateNumberRequired" },
//             ],
//         },
//     }
// }