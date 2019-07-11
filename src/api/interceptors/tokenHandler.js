import storage from '@/utils/storage'


export default function tokenHandler(config) {
    config.headers = {...config.headers,Authorization:"Bearer "+ storage.get('vueDemoToken')}

    return config
}