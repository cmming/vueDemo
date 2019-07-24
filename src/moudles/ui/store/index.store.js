import base from "@/model/base";
import requestMap from "@/api/requestMap";

const state = {
    model: base
}

const getters = {
    base: state => {
        return state.model
    }
}


const mutations = {
    GET_BASE_LIST: (state, data) => {
        state.model.table.data = data
    },
}


const actions = {
    getBaseList({
        commit
    }, params) {
        return new Promise((resolve, reject) => {
            requestMap('GET_BASE_LIST', params).then(response => {
                commit('GET_BASE_LIST', response.data);
                resolve(response.data)
            }).catch(error => {
                reject(error)
            })
        })
    },
    // DELETE_BASE
    // eslint-disable-next-line
    deleteBase({}, params) {
        return new Promise((resolve, reject) => {
            requestMap('DELETE_BASE', params).then(response => {
                // commit('DELETE_BASE', response.data);
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    },

    //STORE_BASE
    // eslint-disable-next-line
    storeBase({}, params) {
        return new Promise((resolve, reject) => {
            requestMap('STORE_BASE', params).then(response => {
                // commit('DELETE_BASE', response.data);
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    },
}


export default {
    ui: {
        state,
        getters,
        mutations,
        actions
    }
}