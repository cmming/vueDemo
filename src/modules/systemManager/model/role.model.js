import ModelGenerator from '@/model/ModelGenerator'

class Role extends ModelGenerator {
  constructor () {
    let model_name = 'systemManager.role'
    let columns = [
      { label_key: 'id', prop: 'id', type: 'input', default_value: '', data_roles: '', show_table: true, show_form: false, show_update_form: false, show_search: false, input_type: '', placeholder: '' },
      { label_key: 'name', prop: 'name', type: 'input', default_value: '', data_roles: 'required', show_table: true, show_form: true, show_update_form: true, show_search: true, input_type: '', placeholder: '' },
      { label_key: 'description', prop: 'description', type: 'input', default_value: '', data_roles: 'required', show_table: true, show_form: true, show_update_form: true, show_search: true, input_type: '', placeholder: '' }
    ]
    super(model_name, columns)

    this.setActionUrl()
  }

  setActionUrl () {
    this.table.commonAction.list.action_url = 'getRoles'
    this.table.commonAction.delete.action_url = 'deleteRole'
    this.table.commonAction.edit.action_url = 'addRole'
    this.model.table.commonAction.width = '400px'

    this.searchArea.config.search_url = 'getRoles'
    this.searchArea.config.is_add = true

    this.form.config.store_url = 'addRole'
    this.form.config.show_url = 'showRole'
    this.form.config.update_url = 'updateRole'
    this.form.config.label_width = '150px'
  }
}

export default new Role().model
