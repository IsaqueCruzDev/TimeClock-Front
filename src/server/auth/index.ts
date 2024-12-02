import api from "../api";
import nookies from "nookies"

export async function login(data: { email: string, password: string}) {
    try {
        const response = await api.post("/auth", data)
        console.log(response) 
        localStorage.setItem("user", JSON.stringify(response.data.data))
        nookies.set(null, "Authentication", response.data.data.token)
        return response.data.data
    } catch (error) {
        throw error
    }
}

export async function logout() {
    try {
        nookies.destroy(null, "Authentication")
    } catch (error) {
        throw error
    }
}