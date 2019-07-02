import storage from '@/utils/storage'
import { getLanguage } from "@/utils/function";

const state = {
    menu: {
        collapse: storage.get('menuCollapse') !== undefined ? Boolean(storage.get('menuCollapse')) : true
    },
    language: storage.get('app-language') || getLanguage(),
    routerList:[
        {
        path: '/dashborad',
        component: '@/layout/index',
        redirect: 'noRedirect',
        name: 'dashborad',
        meta: {
            title: 'dashborad',
            icon: 'table'
        },
        children: [
            {
                path: '/dashborad',
                component: '@/views/dashborad/index',
                name: 'dashboradIndex',
                meta: { title: 'dashborad' }
            }
        ]
    },
    {
        path: '/ui',
        component: '@/layout/index',
        redirect: 'noRedirect',
        name: 'ui',
        meta: {
            title: 'ui',
            icon: 'table'
        },
        children: [
            {
                path: 'form',
                component: '@/views/ui/form',
                name: 'form',
                meta: { title: 'form' }
            },
            {
                path: 'table',
                component: '@/views/ui/table',
                name: 'table',
                meta: { title: 'table' }
            }
        ]
    }
]
}

const getters = {
    menu: state => {
        return state.menu
    },
    language: state => {
        return state.language
    },
    routerList:state => {
        return state.routerList
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
    }
}


const actions = {
    toggleSideBar({ commit }) {
        commit('TOGGLE_SIDEBAR')
    },
    setLanguage({ commit },params){
        commit('SET_LANGUAGE',params)
    }
}


export default {
    state,
    getters,
    mutations,
    actions
}