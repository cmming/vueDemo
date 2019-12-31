import request from './request'
import API_TYPE from './loadApi'
import omit from 'lodash/omit'

export default async function requestMap (apiKey, data) {
  let res; let tmpData = data
  let resource_id = ''
  if (tmpData && tmpData.resource_id !== undefined) {
    resource_id = ('/' + tmpData.resource_id)
    tmpData = omit(tmpData, ['resource_id'])
  }
  // 如果是表单 formdata
  if (API_TYPE[apiKey]['hasData'] && (API_TYPE[apiKey]['method'] === 'post' || API_TYPE[apiKey]['method'] === 'put' || API_TYPE[apiKey]['method'] === 'delete')) {
    res = {
      url: API_TYPE[apiKey]['url'] + resource_id,
      method: API_TYPE[apiKey]['method'],
      data: tmpData
    }
  } else if (API_TYPE[apiKey]['hasData'] && API_TYPE[apiKey]['method'] === 'get') {
    res = {
      url: API_TYPE[apiKey]['url'] + resource_id,
      method: API_TYPE[apiKey]['method'],
      params: tmpData
    }
  } else {
    res = {
      url: API_TYPE[apiKey]['url'] + resource_id,
      method: API_TYPE[apiKey]['method']
    }
  }

  // 自定义 baseurl
  if (API_TYPE[apiKey]['baseURL']) {
    res = { ...res, baseURL: API_TYPE[apiKey]['baseURL'] }
  }

  if (API_TYPE[apiKey]['headers']) {
    res = { ...res, headers: API_TYPE[apiKey]['headers'] }
  }

  let ansycStatus = API_TYPE[apiKey] && API_TYPE[apiKey]['ansyc']
  if (ansycStatus) {
    return request(res)
  } else {
    return request(res)
  }
}
