import React from 'react'
import { FcGoogle } from "react-icons/fc";

const LoginWithThirdParty: React.FC = () => {
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
                <button className="flex w-11/12 items-center justify-center rounded-sm border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                    {/* Increased icon size from h-4 w-4 to h-6 w-6 */}
                    <FcGoogle className="mr-2 h-6 w-6" />
                    Google
                </button>
                <button className="flex w-11/12 items-center justify-center rounded-sm border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                    {/* Increased icon size from h-4 w-4 to h-6 w-6 */}
                    {/* <FaMicrosoft className="mr-2 h-6 w-6 text-blue-500" />
                     */}
                    <div className='mr-2'>
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25" viewBox="0 0 48 48">
                            <path fill="#ff5722" d="M6 6H22V22H6z" transform="rotate(-180 14 14)"></path><path fill="#4caf50" d="M26 6H42V22H26z" transform="rotate(-180 34 14)"></path><path fill="#ffc107" d="M26 26H42V42H26z" transform="rotate(-180 34 34)"></path><path fill="#03a9f4" d="M6 26H22V42H6z" transform="rotate(-180 14 34)"></path>
                        </svg>
                    </div>
                    Microsoft
                </button>
            </div>

        </div>
    )
}

export default LoginWithThirdParty