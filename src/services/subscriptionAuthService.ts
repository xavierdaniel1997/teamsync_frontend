import api from "../api/axiosInstance"

export const createSubscriptionApi = async (data: {planId: string, workspaceId: string, email: string}) => {
    console.log("createSubscriptionApi called with:", data);
    const response = await api.post("/subscriptions/create", data)
    // console.log("response form the createsubscription", response)
    return response.data;
}

export const getMySubscriptionApi = async () => {
    const response = await api.get("subscriptions/current-subscription")
    return response.data;
}

