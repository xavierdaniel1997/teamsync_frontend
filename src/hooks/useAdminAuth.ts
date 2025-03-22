import {useMutation, useQueryClient} from '@tanstack/react-query';
import { loginAdmin, registerAdmin } from '../services/adminAuthService';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../redux/authSlice';




export const useAdminAuthMutation = () => {
    const queryClient = useQueryClient();
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const adminRegister = useMutation({
        mutationFn: registerAdmin,
        onSuccess: (data) => {
            console.log('Admin registered successfully:', data);
            queryClient.invalidateQueries({queryKey: ['adminData']});
            navigate("/admin/login")

        },
        onError: (error: any) => {
            console.error('Admin registration failed:', error.response?.data || error.message);
        },
        onSettled: () => {
            console.log('Mutation settled');
        },
    })


    const adminLogin = useMutation({
        mutationFn: loginAdmin,
        onSuccess: (response) => {
            console.log('Admin Login successfully:', response);
            const {accessToken, admin} = response.data;
            dispatch(setCredentials({accessToken, user: admin}))
            navigate("/admin-dashboard")
            queryClient.invalidateQueries({queryKey: ['adminData']});

        },
        onError: (error: any) => {
            console.error('Admin Login failed:', error.response?.data || error.message);
        },
        onSettled: () => {
            console.log('Mutation settled');
        },
    })

    return {adminRegister, adminLogin}
}