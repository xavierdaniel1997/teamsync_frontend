import { useGoogleLogin } from '@react-oauth/google';
import React from 'react'
import { FcGoogle } from "react-icons/fc";
import { useAuthMutations } from '../../hooks/useAuth';
import { toast } from 'sonner';

const LoginWithThirdParty: React.FC = () => {
    const {loginWithGoogle} = useAuthMutations()   
   

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
                    <div className="w-full border-t border-gray-600"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                    <span className="bg-[#1d1d1d] px-2 text-gray-400">Or continue with:</span>
                </div>
            </div>

            {/* Social login buttons with larger icons and reduced width */}
            <div className="mt-3 space-y-2 flex flex-col items-center">
                <button className="flex w-11/12 items-center justify-center rounded-sm border border-gray-200 bg-gray-300 px-3 py-2 text-sm font-medium text-gray-700 cursor-pointer hover:bg-gray-200 hover:shadow-md"
                onClick={() => googleLogin()}
                >
                    <FcGoogle className="mr-2 h-6 w-6" />
                    Google
                </button>
            </div>

        </div>
    )
}

export default LoginWithThirdParty