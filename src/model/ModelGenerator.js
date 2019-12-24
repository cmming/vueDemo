import Colums from './colums.js'
/**
 * 生成数据模型
 *
 * @class ModelGenerator
 */

class ModelGenerator {
  constructor (model_name, columns, primary_key = 'id') {
    this.model_name = model_name
    this.columns = columns
    this.table = {
      data: [],
      columns: [],
      commonAction: {}
    }
    this.searchArea = {
      config: {},
      model: {},
      base_model: {},
      items: [],
      rules: {}
    }
    this.form = {
      config: {},
      model: {},
      base_model: {},
      items: [],
      rules: {}
    }

    this.primary_key = primary_key
    this.model = this.modelHandle()
  }

  handelColumns () {
    if (this.columns instanceof Array) {
      //
      if (this.columns.length > 0) {
        this.columns.map(val => {
          // console.log(..._.values(val))
          let columsGenerator = new Colums(..._.values(val))

          let columnsItem = columsGenerator.createTableColumns()
          columnsItem && this.table.columns.push(columnsItem)
          this.table.commonAction = this.tableCommonActionGenerator()

          this.form.model = { ...this.form.model, ...columsGenerator.createFormModel() }
          this.form.base_model = { ...this.form.base_model, ...columsGenerator.createFormModel() }
          let formItem = columsGenerator.createFormItems()
          formItem && this.form.items.push(formItem)
          this.form.rules = { ...this.form.rules, ...columsGenerator.createFormRules() }

          this.searchArea.model = { ...this.searchArea.model, ...columsGenerator.createSearchAreaModel() }
          this.searchArea.base_model = { ...this.searchArea.base_model, ...columsGenerator.createSearchAreaModel() }
          columsGenerator.createSearchAreaItems() && this.searchArea.items.push(columsGenerator.createSearchAreaItems())
          // TODO 搜索区域没有添加验证规则
          this.searchArea.rules = {}
        })
      }

      return this
    } else {
      throw new Error('columns must be Array')
    }
  }

  tableCommonActionGenerator () {
    let result = {
      show: true,
      label_key: 'action',
      width: '350px',
      list: { action_url: '' },
      delete: { show: true, title_key: 'delete_btn', action_url: '', icon_name: '', key: this.primary_key },
      edit: { show: true, title_key: 'edit', action_url: '', icon_name: '', key: this.primary_key }
    }

    return result
  }

  modelHandle () {
    this.handelColumns()

    return {
      model_index: this.model_name,
      table: this.table,
      form: this.form,
      searchArea: this.searchArea
    }
  }
}

export default ModelGenerator
