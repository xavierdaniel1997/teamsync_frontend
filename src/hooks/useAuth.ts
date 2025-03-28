import {useMutation, useQueryClient} from '@tanstack/react-query';
import { authService } from '../services/authService';
import { CreateNewPasswordData, CreateProfileData, EmailValidationData, LoginData, OtpValidationData } from '../types/auth';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../redux/authSlice';
import { toast } from 'sonner';
import { data, ErrorResponse, useNavigate } from 'react-router-dom';



export const useAuthMutations = () => {
    const queryClient = useQueryClient();
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const validateEmail = useMutation({
        mutationFn: (data: EmailValidationData) => authService.validateEmail(data),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['emailValidation']});
        },
        onError: (error) => {
            console.error("Email validation error", error)
            console.log(error)
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
    const resendOtp = useMutation({
        mutationFn: (data: EmailValidationData) => authService.resendOtp(data),
        onSuccess: () => {
            console.log("OTP resent successfully");
        },
        onError: (error) => {
            console.error("Failed to resend OTP", error);
        }
    })

    const createProfile = useMutation({
        mutationFn: (data: CreateProfileData) => authService.createProfile(data),
        onSuccess: (response) => {
            const {user, accessToken} = response.data
            dispatch(setCredentials({user, accessToken}))
            queryClient.invalidateQueries({queryKey: ['createProfile']})
            navigate('/create-work-space');
        },
        onError: (error) => {
            console.error("create Profile error", error)
        }
    })

    const loginUser = useMutation({
        mutationFn: (data: LoginData) => authService.loginUser(data),
        onSuccess: (response) => {
            const {userData, accessToken} = response.data
            dispatch(setCredentials({user: userData, accessToken}))
            navigate('/create-work-space');
        },
        onError: (error) => {
            console.log("Failed to login", error)
        }
    })

    const loginWithGoogle = useMutation({
        mutationFn: (accessToken: string) => authService.loginWithGoogle(accessToken),
        onSuccess: (response) => {
            const { user, accessToken } = response.data;
            dispatch(setCredentials({ user, accessToken }));
            // navigate('/dashboard');
            navigate("/create-work-space")
        },
        onError: (error) => {
            console.log("Google login failed", error);
        }
    })

    const forgotPassword = useMutation({
        mutationFn: (data: EmailValidationData) => authService.forgotPassword(data),
        onSuccess: (res) => {
          toast.success(res.message);
          console.log("Forgot password success:", res);
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.message);
            console.error("Forgot password error:", error);
          }
      });
    

    const createNewPassword = useMutation({
        mutationFn: (data: CreateNewPasswordData) => authService.createNewPassword(data),
        onSuccess: (res) => {
            toast.success(res.message)
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.message || "Reset failed");
        }
    })

    return {validateEmail, validateOtp, createProfile, loginUser, loginWithGoogle, resendOtp, forgotPassword, createNewPassword}
}