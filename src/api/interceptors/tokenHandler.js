import storage from '@/utils/storage'


export default function tokenHandler(config,store) {
    config.headers = {...config.headers,Authorization:"Bearer "+ storage.get('vueDemoToken'),'lang':store.getters.language}
    return config
}