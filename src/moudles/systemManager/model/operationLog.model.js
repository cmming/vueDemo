import ModelGenerator from "@/model/ModelGenerator"

class OperationLog extends ModelGenerator {
    constructor() {
        let model_name = 'systemManager.operationLog'
        let columns = [
            { label_key: 'ip', prop: 'ip', type: 'input', default_value: '', data_roles: '', show_table: true, show_form: false, show_update_form: false, show_search: false, input_type: '', placeholder: '' },
            { label_key: 'url', prop: 'url', type: 'input', default_value: '', data_roles: '', show_table: true, show_form: false, show_update_form: false, show_search: false, input_type: '', placeholder: '' },
            { label_key: 'operation', prop: 'operation', type: 'input', default_value: '', data_roles: '', show_table: true, show_form: false, show_update_form: false, show_search: false, input_type: '', placeholder: '' },
            { label_key: 'params', prop: 'params', type: 'input', default_value: '', data_roles: '', show_table: true, show_form: false, show_update_form: false, show_search: false, input_type: '', placeholder: '' },
            { label_key: 'response', prop: 'response', type: 'input', default_value: '', data_roles: '', show_table: true, show_form: false, show_update_form: false, show_search: false, input_type: '', placeholder: '' },
            { label_key: 'user_id', prop: 'user_id', type: 'input', default_value: '', data_roles: '', show_table: true, show_form: false, show_update_form: false, show_search: false, input_type: '', placeholder: '' },
            { label_key: 'updated_at', prop: 'updated_at', type: 'input', default_value: '', data_roles: '', show_table: true, show_form: false, show_update_form: false, show_search: false, input_type: '', placeholder: '' },
            { label_key: 'key_word', prop: 'key_word', type: 'input', default_value: '', data_roles: '', show_table: false, show_form: false, show_update_form: false, show_search: true, input_type: '', placeholder: '' },
        ]
        super(model_name, columns)

        this.setActionUrl()


    }

    setActionUrl() {
        this.table.commonAction.list.action_url = 'getOperationLogs'

        this.searchArea.config.search_url = 'getOperationLogs'

        this.table.commonAction.delete.action_url = 'deleteOperationLog'

    }


}

export default new OperationLog().model