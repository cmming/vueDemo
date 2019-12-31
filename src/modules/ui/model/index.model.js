import ModelGenerator from '@/model/ModelGenerator'

class Demo extends ModelGenerator {
  constructor () {
    let model_name = 'base'
    let columns = [
      { label_key: 'id', prop: 'id', type: 'input', default_value: '', data_roles: '', show_table: true, show_form: false, show_update_form: true, show_search: false, input_type: '', placeholder: '' },
      { label_key: 'email', prop: 'email', type: 'input', default_value: '', data_roles: 'email', show_table: true, show_form: true, show_update_form: true, show_search: true, input_type: '', placeholder: '' },
      { label_key: 'radio', prop: 'radio', type: 'radio', default_value: '', data_roles: '', show_table: true, show_form: true, show_update_form: true, show_search: false, input_type: '', placeholder: '' },
      { label_key: 'checkbox', prop: 'checkbox', type: 'checkbox', default_value: [], data_roles: '', show_table: true, show_form: true, show_update_form: true, show_search: false, input_type: '', placeholder: '' },
      { label_key: 'select', prop: 'select', type: 'select', default_value: '', data_roles: '', show_table: true, show_form: true, show_update_form: true, show_search: false, input_type: '', placeholder: '' },
      { label_key: 'datePicker', prop: 'datePicker', type: 'datePicker', default_value: '', data_roles: '', show_table: true, show_form: true, show_update_form: true, show_search: false, input_type: '', placeholder: '' },
      { label_key: 'transfer', prop: 'transfer', type: 'transfer', default_value: [], data_roles: '', show_table: true, show_form: true, show_update_form: true, show_search: false, input_type: '', placeholder: '' },
      { label_key: 'autocomplete', prop: 'autocomplete', type: 'autocomplete', default_value: '', data_roles: '', show_table: true, show_form: true, show_update_form: true, show_search: false, input_type: '', placeholder: '' }
    ]
    super(model_name, columns)

    this.setActionUrl()

    // this.getRoles({ page_size: 10000000 })
  }

  setActionUrl () {
    this.table.commonAction.list.action_url = 'getBaseList'
    this.table.commonAction.delete.action_url = 'deleteBase'
    this.table.commonAction.edit.action_url = 'storeBase'

    this.searchArea.config.search_url = 'getBaseList'
    this.searchArea.config.is_add = true

    this.form.config.store_url = 'storeBase'
    this.form.config.show_url = 'showBase'
    this.form.config.update_url = 'updateBase'

    // 渲染角色
  }
}

export default new Demo().model
