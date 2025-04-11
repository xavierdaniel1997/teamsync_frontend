import { useGoogleLogin } from '@react-oauth/google';
import { FaGithub } from "react-icons/fa";
import React from 'react'
import { FcGoogle } from "react-icons/fc";
import api from '../../api/axiosInstance';
import { useAuthMutations } from '../../hooks/useAuth';
import { toast } from 'sonner';

const LoginWithThirdParty: React.FC = () => {
    const {loginWithGoogle} = useAuthMutations()

    // const googleLogin = useGoogleLogin({
    //     flow: 'implicit',
    //     onSuccess: async (tokenResponse) => {
    //       console.log("Access Token:", tokenResponse.access_token);
      
    //       try {
    //         const res = await api.post("auth/google", {
    //           access_token: tokenResponse.access_token,
    //         }, { withCredentials: true });
    //         console.log(res.data);
    //       } catch (error) {
    //         console.log("Google login error", error);
    //       }
    //     },
    //     onError: (error) => console.log("Login Failed:", error),
    //   });

    const googleLogin = useGoogleLogin({
        onSuccess: (tokenResponse) => {
            loginWithGoogle.mutate(tokenResponse.access_token);
            toast.success("Google login successfully")
        },
        onError: (error) => console.log("Google Login Failed:", error),
    });
      
    return (
        <div>
            <div className="relative mt-2">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                    <span className="bg-white px-3 text-gray-500">Or continue with:</span>
                </div>
            </div>

            {/* Social login buttons with larger icons and reduced width */}
            <div className="mt-3 space-y-2 flex flex-col items-center">
                <button className="flex w-11/12 items-center justify-center rounded-sm border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 cursor-pointer hover:bg-gray-200 hover:shadow-md"
                onClick={() => googleLogin()}
                >
                    <FcGoogle className="mr-2 h-6 w-6" />
                    Google
                </button>
                {/* <button className="flex w-11/12 items-center justify-center rounded-sm border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 hover:shadow-2xl">
                <FaGithub className='mr-2 h-6 w-6'/>
                    Github
                </button> */}
            </div>

        </div>
    )
}

export default LoginWithThirdParty