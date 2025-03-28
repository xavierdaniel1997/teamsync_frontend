import api from "../api/axiosInstance"

export const createSubscriptionApi = async (data: {planId: string, workspaceId: string, email: string}) => {
    const response = await api.post("/subscriptions/create", data)
    return response.data;
}

