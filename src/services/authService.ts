import api from "../api/axiosInstance";
import { CreateProfileData, EmailValidationData, OtpValidationData } from "../types/auth";


export const authService = {
    validateEmail: async (data: EmailValidationData) => {
        const response = await api.post("auth/validateEmail", data)
        return response.data;
    },

    validateOtp: async (data: OtpValidationData) => {
        const response = await api.post("auth/verifyOtp", data)
        return response.data;
    },

    createProfile: async (data: CreateProfileData) => {
        const response = await api.post("auth/register", data)
        return response.data
    }
}