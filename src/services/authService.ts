
import api from "../api/axiosInstance";
import { CreateNewPasswordData, CreateProfileData, EmailValidationData, LoginData, OtpValidationData } from "../types/auth";


export const authService = {
    validateEmail: async (data: EmailValidationData) => {
        const response = await api.post("auth/validateEmail", data)
        console.log("respone of the first registration email", response)
        return response.data;
    },

    validateOtp: async (data: OtpValidationData) => {
        const response = await api.post("auth/verifyOtp", data)
        return response.data;
    },

    createProfile: async (data: CreateProfileData) => {
        const response = await api.post("auth/register", data)
        console.log("respone form the authService", response)
        return response.data
    },

    loginUser: async (data: LoginData) => {
        const respone = await api.post("auth/loginUser", data)
        return respone.data;
    },

    loginWithGoogle: async (accessToken: string) => {
        const response = await api.post("auth/google", { access_token: accessToken }, { withCredentials: true })
        return response.data
    },

    resendOtp: async (data: EmailValidationData) => {
        const respone = await api.post("auth/resend-Otp", data)
        return respone.data;
    },

    forgotPassword: async(data: EmailValidationData) => {
        const response = await api.post("auth/forgotPasswordEmail", data)
        return response.data;
    },

    createNewPassword: async(data: CreateNewPasswordData) => {
        const {email, newPassword, cpassword, token } = data;
        const response = await api.post(`auth/resetpassword/${token}`, {
            email, newPassword, cpassword
        })
        return response.data;
    }
}