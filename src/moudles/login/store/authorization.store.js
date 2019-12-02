import requestMap from "@/api/requestMap";
import storage from '@/utils/storage'

function routerListTransforms(data) {
    function item(data) {
        data.map(val => {
            val['meta'] = { title: val.title, icon: val.icon, type: val.type===1?'menu':'', hidden: Boolean(val.hidden), model: val.model }
            _.unset(val, 'title')
            _.unset(val, 'icon')
            _.unset(val, 'type')
            _.unset(val, 'hidden')
            _.unset(val, 'model')
            _.unset(val, 'created_at')
            if(val.id){
                item(val.children)
            }
        })
    }

    // item(data)
    return data
}

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
    async getUserInfo({
        commit
    }, params) {
        return new Promise((resolve, reject) => {
            requestMap('USER_INFO', params).then(response => {
                response.data.routerList = routerListTransforms(response.data.routerList)
                // console.log(response.data.testRouterList,response.data.routerList)
                commit('USER_INFO', response.data.routerList);
                storage.set('indexPage',response.data.indexPage)
                storage.set('userInfo', response.data);
                // commit('INDEX_PAGE', response.data.indexPage);
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