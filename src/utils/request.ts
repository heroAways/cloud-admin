import axios from 'axios';
const service = axios.create({
  baseURL: '',
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