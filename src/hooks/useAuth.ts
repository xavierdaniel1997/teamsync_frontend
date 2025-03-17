import {useMutation, useQueryClient} from '@tanstack/react-query';
import { authService } from '../services/authService';
import { CreateProfileData, EmailValidationData, OtpValidationData } from '../types/auth';
import { error } from 'console';




export const useAuthMutations = () => {
    const queryClient = useQueryClient();
    

    const validateEmail = useMutation({
        mutationFn: (data: EmailValidationData) => authService.validateEmail(data),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['emailValidation']});
        },
        onError: (error) => {
            console.error("Email validation error", error)
        }
        
    })

    const validateOtp = useMutation({
        mutationFn: (data: OtpValidationData) => authService.validateOtp(data),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['otpValidation']});
        },
        onError: (error) => {
            console.error("Otp validation error", error)
        }
    })

    // resendOtp


    const createProfile = useMutation({
        mutationFn: (data: CreateProfileData) => authService.createProfile(data),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['createProfile']})
        },
        onError: (error) => {
            console.error("create Profile error", error)
        }
    })


    return {validateEmail, validateOtp, createProfile}
}