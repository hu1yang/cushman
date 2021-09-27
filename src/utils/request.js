import axios from 'axios'
import { getToken } from './auth' // 获取token

const instance = axios.create({
    baseURL: 'http://localhost:30001',//服务器地址
    timeout:5000
});

// Add a request interceptor
//全局请求拦截
instance.interceptors.request.use(function (config) {
    // Do something before request is sent
    config.headers['authorization'] = 'Bearer' + getToken();
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

// Add a response interceptor
//请求返回之后执行
instance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  });


export function get(url , params) {
    return instance.get(url,{
        params
    })
} 
export function post(url , data) {
    return instance.post(url,data)
}
export function put(url , data){
    return instance.put(url , data)
}
export function del(url) {
    return instance.delete(url)
}