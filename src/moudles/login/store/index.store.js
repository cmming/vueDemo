import login from "../model/index.model";
import requestMap from "@/api/requestMap";
import storage from '@/utils/storage'

const state = {
    model: login,
    userInfo: {
        token: storage.get('vueDemoToken') || ''
    }
}

const getters = {
    login: state => {
        return state.model
    },
    userInfo: state => {
        return state.userInfo
    }
}


const mutations = {
    CAPTCHA: (state, data) => {
        state.model.model.ckey = data.key
        state.model.model.img = data.img
    },
    SET_TOKEN: (state, data) => {
        state.userInfo.token = data.access_token
        storage.set('vueDemoToken', data.access_token)
    },
}


const actions = {
    //CAPTCHA
    getCaptcha({
        commit
    }, params) {
        return new Promise((resolve, reject) => {
            requestMap('CAPTCHA', params).then(response => {
                commit('CAPTCHA', response.data);
                resolve(response.data)
            }).catch(error => {
                reject(error)
            })
        })
    },
    // DELETE_USER
    // eslint-disable-next-line
    login({ commit }, params) {
        return new Promise((resolve, reject) => {
            requestMap('LOGIN', params).then(response => {
                // 判断用户是否登录成功
                if (response.status == 200) {
                    commit('SET_TOKEN', response.data);
                }
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    },
    refreshToken({ commit }) {
        return new Promise((resolve, reject) => {
            requestMap('REFRESH_TOKEN').then(response => {
                // 判断用户是否登录成功
                if (response.status == 200) {
                    commit('SET_TOKEN', response.data);
                }
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    },
}


export default {
    login: {
        state,
        getters,
        mutations,
        actions
    }
}