import user from "../model/index.model";
import requestMap from "@/api/requestMap";

const state = {
    user: user
}

const getters = {
    user: state => {
        return state.user
    }
}


const mutations = {
    GET_USER_LIST: (state, data) => {
        state.model.table.data = data
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
    deleteUser({ }, params) {
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
    storeUser({ }, params) {
        return new Promise((resolve, reject) => {
            requestMap('STORE_USER', params).then(response => {
                // commit('DELETE_USER', response.data);
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    },
}


export default {
    user:{
        state,
        getters,
        mutations,
        actions
    }
}