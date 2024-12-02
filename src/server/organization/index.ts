import api from "../api";

export async function getOrganizations() {
    try {
        const response = await api.get('/organization')
        return response.data.data
    } catch (error) {
        throw error   
    }
}