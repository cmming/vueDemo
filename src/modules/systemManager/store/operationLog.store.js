import operationLog from '../model/operationLog.model'
import requestMap from '@/api/requestMap'
const state = {
  model: operationLog
}

const getters = {
  operationLog: state => {
    return state.model
  }
}

const mutations = {
  OPERATIONLOGS: (state, data) => {
    state.model.table.data = data
  }
}

const actions = {
  // CAPTCHA
  getOperationLogs ({
    commit
  }, params) {
    return new Promise((resolve, reject) => {
      requestMap('OPERATIONLOGS', params).then(response => {
        commit('OPERATIONLOGS', response.data)
        resolve(response.data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // deleteOperationLog
  // eslint-disable-next-line
    deleteOperationLog({}, params) {
    return new Promise((resolve, reject) => {
      requestMap('DELETE_OPERATIONLOG', params).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  }
}

export default {
  operationLog: {
    state,
    getters,
    mutations,
    actions
  }
}
