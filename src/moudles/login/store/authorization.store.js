import requestMap from "@/api/requestMap";

const state = {
    routerList: [],
    dynamicMenu: []
}

const getters = {
    routerList: state => {
        return state.routerList
    },
    dynamicMenu: state => {
        return state.dynamicMenu
    }
}


const mutations = {
    USER_INFO: (state, data) => {
        state.routerList = data
    },
    USER_MENU: (state, data) => {
        state.dynamicMenu = data
    },
}


const actions = {
    getUserInfo({
        commit
    }, params) {
        return new Promise((resolve, reject) => {
            requestMap('USER_INFO', params).then(response => {
                commit('USER_INFO', response.data.routerList);
                resolve(response.data)
            }).catch(error => {
                reject(error)
            })
        })
    },
    setUserMenu({
        commit
    }, params) {
        commit('USER_MENU', params);
    },
}


export default {
    authorization: {
        state,
        getters,
        mutations,
        actions
    }
}