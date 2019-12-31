export default {
  GET_USER_LIST: {
    url: '/user',
    method: 'get',
    hasData: true
  },
  DELETE_USER: {
    url: '/user',
    method: 'delete',
    hasData: true
  },
  STORE_USER: {
    url: '/user',
    method: 'post',
    hasData: true
  },
  UPDATE_USER: {
    url: '/user',
    method: 'put',
    hasData: true
  },
  SHOW_USER: {
    url: '/user',
    method: 'get',
    hasData: false
  },
  EXPORT_USER: {
    url: '/user/export',
    method: 'get',
    hasData: false,
    responseType: 'arraybuffer'
  }

}
