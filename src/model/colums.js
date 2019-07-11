import _ from "lodash";
import { validateNumber,validateEmail } from "@/utils/validate";

class Colums {
    /**
     * 
     * @param {string} label_key 数据 多语言的key
     * @param {string} prop 数据 传递过程中的key
     * @param {string} type 数据 录入时候的类型
     * @param {*} default_value 数据录入时候的默认值
     * @param {*} data_roles 数据录入时候的规则  required|eamil 或者是一个自定义函数
     * @param {boolean} show_table 是否显示在列表数据中
     * @param {boolean} show_form 是否显示在录入的位置
     * @param {boolean} show_update_form 是否显示在更新的位置
     * @param {boolean} show_search 是否显示在搜索区域
     * @param {string} input_type 数据为input 时候的子类型
     * @param {string} placeholder 数据录入时候选择提示用户的信息
     * {label_key:'',prop:'',type:'input',default_value:'',data_roles:[],show_table:true,show_form:true,show_update_form:true,show_search:false,input_type:'',placeholder:''}
     */
    constructor(label_key, prop, type, default_value, data_roles, show_table = true, show_form = true, show_update_form = true, show_search = false, input_type = '', placeholder = '',can_update=undefined) {
        this.label_key = label_key
        this.prop = prop
        this.type = type
        this.default_value = default_value
        this.data_roles = data_roles
        this.show_table = show_table
        this.show_form = show_form
        this.show_update_form = show_update_form
        this.show_search = show_search
        this.input_type = input_type
        this.placeholder = placeholder
        this.can_update = can_update
    }

    // 生成列表的数据模型
    createTableColumns() {
        if (this.show_table) {
            return { label_key: this.label_key, prop: this.label_key }
        }
    }

    // 生成数据录入的模型
    createFormModel() {
        let result = {}
        if (this.show_form) {
            result = this.modelGenerator()
        }
        return result
    }

    // 搜索区域的表单
    // { label_key: "age", prop: "age", type: "input", input_type: "number", placeholder: true },
    createFormItems() {
        let result
        if (this.show_form) {
            result = {
                label_key: this.label_key,
                error:'',
                prop: this.prop,
                type: this.type,
                input_type: this.input_type,
                placeholder: this.placeholder,
                show_update_form:this.show_update_form,
                can_update:this.can_update!==undefined?this.can_update:this.show_update_form
            }
        }

        return result
    }

    /**
     * 生成表单数据的验证规则
     */
    createFormRules() {
        let result = {}
        result[this.prop] = this.roleGenerator(this.data_roles)

        return result

    }

    /**
     * 搜索区域模型
     */
    createSearchAreaModel() {
        let result = {}
        if (this.show_search) {
            result = this.modelGenerator()
        }

        return _.assign(result, { page: 1, page_size: 10, })
    }

    /**
     * 搜索区域的html
     */
    createSearchAreaItems() {
        if (this.show_search) {
            return {
                label_key: this.label_key,
                prop: this.prop,
                type: this.type,
                input_type: this.input_type,
                placeholder: this.placeholder,
                // show_update_form 为false 这一列就会直接不显示 model中的数据按照原来的至进行返回 也可以在提交的时候做出来，将其去除
                can_update: this.show_update_form
            }
        }
    }


    /**
     * 数据模型生成
     */
    modelGenerator() {
        let model_default
        let model_key = this.prop
        let result = {}
        if (this.default_value !== '') {
            switch (this.input_type) {
                case 'string':
                    model_default = ''
                    break;
                case 'boolean':
                    model_default = ''
                    break;
                case 'Array':
                    model_default = []
                    break;
                default:
                    model_default = ''
                    break;
            }
        } else {
            model_default = this.default_value
        }
        result[model_key] = model_default

        return result
    }

    /**
     * 数据验证规则生成
     * @param {string} roles 常用的验证规则 required|eamil
     * @param {*} customRoles 
     */
    roleGenerator(roles, customRoles = []) {
        let rolesArr = _.split(roles, '|')
        let result = []
        if (rolesArr.length > 0) {
            rolesArr.map((val) => {
                switch (val) {
                    case 'required':
                        result.push({ required: true, trigger: 'blur', message_key: "required" })
                        break;
                    case 'validateNumberRequired':
                        result.push({ validator: validateNumber, required: true, trigger: 'blur', message_key: "validateNumberRequired" })
                        break;
                    case 'validateNumber':
                        result.push({ validator: validateNumber, trigger: 'blur', message_key: "validateNumber" })
                        break;
                    case 'validateEmail':
                        result.push({ validator: validateEmail, trigger: 'blur', message_key: "validateEmail" })
                        break;
                    case 'validateEmailReqiured':
                        result.push({ validator: validateEmail,required: true, trigger: 'blur', message_key: "validateEmailReqiured" })
                        break;
                    default:
                        break;
                }
            })
        }

        result = [...customRoles, ...result]
        return result
    }

}


export default Colums