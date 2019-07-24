import store from '@/store'

export default function cancelRequest() {
    // const cancelToken = axios.CancelToken
    // console.log(store)
    // // store.getters.source.cancel&&store.getters.source.cancel()
    // store.getters.source = cancelToken.source()
    store.getters.axiosPromiseArr.forEach((e,i) => {
        typeof(e)==='function'&&e()
        store.dispatch('storeAxios', i)
        store.dispatch('hideLoading')
    });

    // store.getters.axiosPromiseArr =[]
}