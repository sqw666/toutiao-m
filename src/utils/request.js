import axios from 'axios'
import store from '@/store/'
import { transform } from 'lodash'
import JSONbig from 'json-bigint'


const request = axios.create({
    baseURL: 'http://ttapi.research.itcast.cn/',
    transformResponse: [function(data) {
        try {
            return JSONbig.parse(data)
        } catch (err) {
            console.log('转换失败', err)
            return data
        }
    }]
})

export default request


// axios.interceptors.request.use(founction (config){
//     return config
// }, function (error) {
//     return Promise.reject(error)
// }


// )







// Add a request interceptor
request.interceptors.request.use(function(config) {
    // Do something before request is sent
    const { user } = store.state
    if (user) {
        config.headers.Authorization = `Bearer ${user.token}`
    }
    return config
}, function(error) {
    // Do something with request error
    return Promise.reject(error);
})