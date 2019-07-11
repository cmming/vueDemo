import storage from '@/utils/storage'
import { getLanguage } from "@/utils/function";

const state = {
    menu: {
        collapse: storage.get('menuCollapse') !== undefined ? Boolean(storage.get('menuCollapse')) : true
    },
    language: storage.get('app-language') || getLanguage(),
    // small  medium mini default
    size: storage.get('size') || 'medium',
    loading: false
}

const getters = {
    menu: state => {
        return state.menu
    },
    language: state => {
        return state.language
    },
    size: state => {
        return state.size
    },
    loading: state => {
        return state.loading
    },
}


const mutations = {
    TOGGLE_SIDEBAR: state => {
        state.menu.collapse = !state.menu.collapse
        storage.set('menuCollapse', state.menu.collapse)
            // if (state.menu.collapse) {
            //     storage.set('menuCollapse', 1)
            // } else {
            //     storage.set('menuCollapse', 0)
            // }
    },
    SET_LANGUAGE: (state, data) => {
        state.language = data
        storage.set('app-language', data)
    },

    SET_SIZE: (state, data) => {
        state.size = data
        storage.set('size', data)
    },
    SHOW_LOADING: (state) => {
        state.loading = true
    },
    HIDE_LOADING: (state) => {
        state.loading = false
    }
}


const actions = {
    toggleSideBar({ commit }) {
        commit('TOGGLE_SIDEBAR')
    },
    setLanguage({ commit }, params) {
        commit('SET_LANGUAGE', params)
    },
    setSize({ commit }, params) {
        commit('SET_SIZE', params)
    },
    showLoading({ commit }, params) {
        commit('SHOW_LOADING', params)
    },
    hideLoading({ commit }, params) {
        commit('HIDE_LOADING', params)
    },
}


export default {
    state,
    getters,
    mutations,
    actions
}