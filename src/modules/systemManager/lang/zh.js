export default {
  langKey: 'systemManager',
  lang: {
    role: {
      table: {
        columns: {
          id: '编号',
          name: '名称',
          description: '描述'

        }
      },
      form: {
        name: {
          label: '名称'
        },
        description: {
          label: '描述'
        }
      }
    },
    operationLog: {
      table: {
        columns: {
          ip: '操作ip',
          url: '请求url',
          operation: '操作',
          params: '参数',
          response: '请求参数',
          user_id: '操作用户编号',
          updated_at: '操作时间'
        }
      },
      form: {
        ip: {
          label: '操作ip'
        },
        key_word: {
          label: '关键字'
        }
      }
    }
  }
}
