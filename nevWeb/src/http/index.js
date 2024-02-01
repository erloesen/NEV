import axios from 'axios'

const authToken = localStorage.getItem('token')

const instance = axios.create({
    //backend
    baseURL: 'http://172.16.206.127:3000',
    timeout: 6000,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `${authToken}`
    }
})

// block req and res before then or catch
instance.interceptors.request.use(function (config) {
    // do sth before req
    config.headers.Authorization = `${authToken}`;
    return config;
}, function (error) {
    return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
    // do sth to res
    return response.data;
}, function (error) {
    return Promise.reject(error);
});

export default instance