import user from "../model/index.model";
import requestMap from "@/api/requestMap";
// console.log(user)
const state = {
    model: user
}

const getters = {
    user: state => {
        return state.model
    }
}


const mutations = {
    GET_USER_LIST: (state, data) => {
        state.model.table.data = data
    },
    SET_USER_FORM: (state, data) => {
        state.model.form.model = data
    },
}


const actions = {
    getUserList({
        commit
    }, params) {
        return new Promise((resolve, reject) => {
            requestMap('GET_USER_LIST', params).then(response => {
                commit('GET_USER_LIST', response.data);
                resolve(response.data)
            }).catch(error => {
                reject(error)
            })
        })
    },
    // DELETE_USER
    // eslint-disable-next-line
    deleteUser({}, params) {
        return new Promise((resolve, reject) => {
            requestMap('DELETE_USER', params).then(response => {
                // commit('DELETE_USER', response.data);
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    },

    //STORE_USER
    // eslint-disable-next-line
    storeUser({}, params) {
        return new Promise((resolve, reject) => {
            requestMap('STORE_USER', params).then(response => {
                // commit('DELETE_USER', response.data);
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    },
    //SHOW_USER
    // eslint-disable-next-line
    showUser({ commit }, params) {
        return new Promise((resolve, reject) => {
            requestMap('SHOW_USER', params).then(response => {
                commit('SET_USER_FORM', response.data.data);
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    },

    // eslint-disable-next-line
    updateUser({}, params) {
        return new Promise((resolve, reject) => {
            requestMap('UPDATE_USER', params).then(response => {
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    },
}


export default {
    user: {
        state,
        getters,
        mutations,
        actions
    }
}