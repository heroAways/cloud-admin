import axios from 'axios';
const service = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
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