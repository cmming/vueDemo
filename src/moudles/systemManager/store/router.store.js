import router from "../model/router.model";
import requestMap from "@/api/requestMap";

const state = {
    model: router
}

const getters = {
    router: state => {
        return state.model
    }
}


const mutations = {
    ALL_ROUTER: (state, data) => {
        state.model.routerList = data
    },
}


const actions = {
    //CAPTCHA
    getRouter({
        commit
    }, params) {
        return new Promise((resolve, reject) => {
            requestMap('ALL_ROUTER', params).then(response => {
                commit('ALL_ROUTER', response.data);
                resolve(response.data)
            }).catch(error => {
                reject(error)
            })
        })
    },

    // eslint-disable-next-line
    updateRouter({}, params) {
        return new Promise((resolve, reject) => {
            requestMap('UPDATE_ROUTER', params).then(response => {
                resolve(response.data)
            }).catch(error => {
                reject(error)
            })
        })
    },

    // eslint-disable-next-line
    addRouter({}, params) {
        return new Promise((resolve, reject) => {
            requestMap('STORE_ROUTER', params).then(response => {
                resolve(response.data)
            }).catch(error => {
                reject(error)
            })
        })
    },
   
}


export default {
    router: {
        state,
        getters,
        mutations,
        actions
    }
}