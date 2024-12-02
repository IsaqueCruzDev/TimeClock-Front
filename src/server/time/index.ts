import api from "../api";

interface ICreateTime {
    hourStart: Date
    hourEnd?: Date
    userId: number
    organizationId: number
}

export async function getTimes() {
    try {
        const response = await api.get("/time")
        return response.data.data
    } catch (error) {
        throw error
    }
}

export async function createTime(data: ICreateTime) {
    try {
        const response = await api.post("/time", data)
        return response.data.data
    } catch (error) {
        throw error
    }
}

export async function updateTime(id: number, data: ICreateTime) {
    try {
        const response = await api.put(`/time?timeId=${id}`, data)
        return response.data.data
    } catch (error) {
        throw error
    }
}


export async function deleteTime(id: number) {
    try {
        const response = await api.delete(`/time?timeId=${id}`)
        return response.data.data
    } catch (error) {
        throw error
    }
}