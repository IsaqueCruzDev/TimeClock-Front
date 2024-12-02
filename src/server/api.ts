import axios from "axios"

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001",
    timeout: 5000,
    headers: {
        "Content-Type": "application/json"
    }
})

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("Authentication")

    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }

    return config
},
    (error) => {
        return Promise.reject(error)
    }
)

api.interceptors.response.use((response) => {
    return response
},
    (error) => {
        if (error.respose?.status === 401) {
            window.location.href = '/login'
        }
        return Promise.reject(error)
    }
)

export default api