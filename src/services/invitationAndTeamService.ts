import api from "../api/axiosInstance"

export const acceptInvitationApi = async (data: {token: string}) => {
    const response = await api.post("project/accept-invitation", data)
    return response.data;
}