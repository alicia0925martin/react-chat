import axios from "axios";


export const axiosInstance = axios.create({
    baseURL: import.meta.env.MODE === "development" ? "https://chatty-backend-24kt.onrender.com/api/v1": "https://chatty-backend-24kt.onrender.com/api/v1",
    withCredentials: true
})

