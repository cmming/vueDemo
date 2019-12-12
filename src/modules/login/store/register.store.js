import register from "../model/register.model";
import requestMap from "@/api/requestMap";

const state = {
    model: register
}

const getters = {
    register: state => {
        return state.model
    },
}


const mutations = {
    // CAPTCHA: (state, data) => {
    //     state.model.model.ckey = data.key
    //     state.model.model.img = data.img
    // },
}


const actions = {
   
    // DELETE_USER
    // eslint-disable-next-line
    register({ commit }, params) {
        return new Promise((resolve, reject) => {
            requestMap('REGISTER', params).then(response => {
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    },
    // DELETE_USER
    // eslint-disable-next-line
    getRegisterCode({ commit }, params) {
        return new Promise((resolve, reject) => {
            requestMap('GET_REGISTER_EMAIL_CODE', params).then(response => {
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    },
}


export default {
    register: {
        state,
        getters,
        mutations,
        actions
    }
}