import request from './request'
import API_TYPE from './loadApi'


export default function requestMap(apiKey, data) {

    // console.log(data)
    let res, tmpData = data;
    //如果是表单 formdata
    if (API_TYPE[apiKey]['hasData'] && (API_TYPE[apiKey]['method'] === 'post' || API_TYPE[apiKey]['method'] === 'put' || API_TYPE[apiKey]['method'] === 'delete')||tmpData && tmpData.resource_id !== undefined) {
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
    }else{
        res = {
            url: API_TYPE[apiKey]['url'],
            method: API_TYPE[apiKey]['method'],
        };
    }

    // 自定义 baseurl
    if(API_TYPE[apiKey]['baseURL']){
        res = {...res,baseURL:API_TYPE[apiKey]['baseURL']}
    }

    // headers:{
    //     'Content-Type': 'application/json'
    // }
    if(API_TYPE[apiKey]['headers']){
        res = {...res,headers:API_TYPE[apiKey]['headers']}
    }
 
    // 去除 headers baseURL method url
    // let setting = _.omit(API_TYPE[apiKey],['headers','baseURL','method','url','hasData'])

    // res = {...setting,...res}

    // console.log(res)

    return request(res)
}