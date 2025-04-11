import api from "../api/axiosInstance"

export const getAllUserApi = async () => {
    const response = await api.get("user-managment/user-details")
    return response.data;
}