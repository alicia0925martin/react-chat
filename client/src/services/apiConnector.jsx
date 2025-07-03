import axios from "axios";


export const axiosInstance = axios.create({
    baseURL:  "https://chatty-backend-24kt.onrender.com/api/v1" ,
    withCredentials: true
})

