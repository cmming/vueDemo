import role from '../model/role.model'
import requestMap from '@/api/requestMap'
const state = {
  model: { ...role, routers: [] }
}

const getters = {
  role: state => {
    return state.model
  }
}

const mutations = {
  ROLES: (state, data) => {
    state.model.table.data = data
  },

  SET_ROLE_FORM: (state, data) => {
    state.model.form.model = data
  },
  SET_ROLE_ROUTER: (state, data) => {
    state.model.routers = data
  }
}

const actions = {
  // CAPTCHA
  getRoles ({
    commit
  }, params) {
    return new Promise((resolve, reject) => {
      requestMap('ROLES', params).then(response => {
        commit('ROLES', response.data)
        resolve(response.data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  showRole ({
    commit
  }, params) {
    return new Promise((resolve, reject) => {
      requestMap('SHOW_ROLE', params).then(response => {
        commit('SET_ROLE_FORM', response.data.data)
        resolve(response.data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // eslint-disable-next-line
    updateRole({}, params) {
    return new Promise((resolve, reject) => {
      requestMap('UPDATE_ROLE', params).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // eslint-disable-next-line
    addRole({}, params) {
    return new Promise((resolve, reject) => {
      requestMap('STORE_ROLE', params).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // eslint-disable-next-line
    deleteRole({}, params) {
    return new Promise((resolve, reject) => {
      requestMap('DELETE_ROLE', params).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // eslint-disable-next-line
    getRoleRouter({ commit }, params) {
    return new Promise((resolve, reject) => {
      requestMap('ROLE_ROUTER', params).then(response => {
        // SET_ROLE_ROUTER
        commit('SET_ROLE_ROUTER', response.data)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // eslint-disable-next-line
    storeRoleRouter({}, params) {
    return new Promise((resolve, reject) => {
      requestMap('STORE_ROLE_ROUTER', params).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  }

}

export default {
  role: {
    state,
    getters,
    mutations,
    actions
  }
}
