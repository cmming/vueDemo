import storage from '@/utils/storage'

const state = {
    menu: {
        collapse: storage.get('menuCollapse') !== undefined ? Boolean(storage.get('menuCollapse')) : true
    }
}

const getters = {
    menu: state => {
        return state.menu
    }
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
}


const actions = {
    toggleSideBar({ commit }) {
        commit('TOGGLE_SIDEBAR')
    },
}


export default {
    state,
    getters,
    mutations,
    actions
}