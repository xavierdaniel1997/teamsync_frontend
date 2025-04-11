import api from "../api/axiosInstance"

export const getuserDetilasApi = async () => {
    const respone = await api.get("user/user-details")
    return respone;
}