import request from './request'
import API_TYPE from './index'


export default function requestMap(apiKey, data) {

    // console.log(data)
    let res, tmpData = data;
    //如果是表单 formdata
    if (API_TYPE[apiKey]['hasData'] && (API_TYPE[apiKey]['method'] === 'post' || API_TYPE[apiKey]['method'] === 'put' || API_TYPE[apiKey]['method'] === 'delete')) {
        let resource_id = tmpData && tmpData.resource_id !== undefined ? ('/' + tmpData.resource_id) : ''
        res = {
            url: API_TYPE[apiKey]['url'] + resource_id,
            method: API_TYPE[apiKey]['method'],
            data: tmpData,
        };
    } else if (API_TYPE[apiKey]['hasData'] && API_TYPE[apiKey]['method'] === 'get') {
        let resource_id = tmpData && tmpData.resource_id !== undefined ? ('/' + tmpData.resource_id) : ''
        res = {
            url: API_TYPE[apiKey]['url'] + resource_id,
            method: API_TYPE[apiKey]['method'],
            params: tmpData,
        };
    }

    return request(res)
}