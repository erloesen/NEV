import axios from 'axios'

const instance = axios.create({
    //backend
    baseURL: 'http://localhost:3000',
    timeout: 6000,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
})

// block req and res before then or catch
instance.interceptors.request.use(function (config) {
    // do sth before req
    return config;
}, function (error) {
    return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
    // do sth to res
    return response;
}, function (error) {
    return Promise.reject(error);
});

export default instance