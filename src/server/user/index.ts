import api from "../api";

export async function getUserById(id: number) {
    try {
        const response = await api.get(`/user/byId?userId=${id}`)
        return response.data.data.name
    } catch (error) {
        throw error
    }
}