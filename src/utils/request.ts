import axios from 'axios';
const service = axios.create({
  baseURL: 'https://mock.mengxuegu.com/mock/6638b8cfcab9671f88bd3125/api',
  timeout: 5000
});
service.interceptors.request.use(config=>{
    return config
},err=>{
    return Promise.reject(err)
})
service.interceptors.response.use(response => {
    return response
}, err => {
    return Promise.reject(err)
})
export default service