import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000/api',
});


API.interceptors.request.use( (req) =>{

    const token = localStorage.getItem("token")
    if(token){
        req.headers.authorization = `Bearer ${token}`
    }
    return req
});

export default API