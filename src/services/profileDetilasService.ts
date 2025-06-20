import api from "../api/axiosInstance"

export const getuserDetilasApi = async () => {
    const respone = await api.get("user/user-details")
    return respone.data;
}

export const updateUserProfileApi = async (formData: FormData) => {
    console.log("this is the data send to the update profile api", formData)
    const respone = await api.put("/user/update-profile", formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    })
    return respone.data;
}