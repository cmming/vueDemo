import Colums from './colums.js'
/**
 * 生成数据模型
 *
 * @class ModelGenerator
 */

class ModelGenerator {

    constructor(model_name, columns, primary_key = 'id') {
        // let temp = {
        //     config: {},
        //     model: {},
        //     items: [],
        //     rules: {},
        // }
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
            items: [],
            rules: {},
        }
        this.form = {
            config: {},
            model: {},
            items: [],
            rules: {},
        }

        this.primary_key = primary_key
        this.model = this.modelHandle()
    }

    handelColumns() {
        if (this.columns instanceof Array) {
            // 
            if (this.columns.length > 0) {
                this.columns.map(val => {
                    // console.log(..._.values(val))
                    let columsGenerator = new Colums(..._.values(val))

                    this.table.columns.push(columsGenerator.createTableColumns())
                    this.table.commonAction = this.tableCommonActionGenerator()

                    this.form.model = {...this.form.model,...columsGenerator.createFormModel()}
                    columsGenerator.createFormItems()&&this.form.items.push(columsGenerator.createFormItems())
                    this.form.rules = {...this.form.rules,...columsGenerator.createFormRules()}

                    this.searchArea.model = {...this.searchArea.model,...columsGenerator.createSearchAreaModel()}
                    columsGenerator.createSearchAreaItems()&&this.searchArea.items.push(columsGenerator.createSearchAreaItems())
                    //TODO 搜索区域没有添加验证规则
                    this.searchArea.rules = {}
                })
            }

            return this
        } else {
            throw new Error('columns must be Array')
        }
    }


    tableCommonActionGenerator() {
        let result = {
            show: true,
            label_key: 'action',
            width: '350px',
            list: { action_url: '', },
            delete: { show: true, title_key: 'delete_btn', action_url: '', icon_name: '', key: this.primary_key },
            edit: { show: true, title_key: 'edit', action_url: '', icon_name: '', key: this.primary_key },
        }
        
        return result
    }

    modelHandle(){

        this.handelColumns()

        return {
            model_index:this.model_name,
            table:this.table,
            form:this.form,
            searchArea:this.searchArea
        }
    }



}


export default ModelGenerator