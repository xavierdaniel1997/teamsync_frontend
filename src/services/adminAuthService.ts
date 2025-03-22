import api from "../api/axiosInstance";
import { CreateProfileData, LoginData } from "../types/auth";



export const registerAdmin = async (data: CreateProfileData) => {
    const respone = await api.post("auth/registerAdmi", data)
    return respone.data;
}

export const loginAdmin = async (data: LoginData) => {
    const respones = await api.post("auth/loginAdmin", data)
    return respones.data
}