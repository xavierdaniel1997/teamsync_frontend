import { FcGoogle } from "react-icons/fc";
import logImage from "../../assets/teamsync-log.png";
import leftVector from "../../assets/leftVector.png";
import rightVector from "../../assets/rightVector.png";
import { Link } from "react-router-dom";

const LoginForm: React.FC = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-2 py-8 sm:px-4 lg:px-6 relative">
      {/* Background vectors */}
      <img 
        src={leftVector} 
        alt="Left Vector" 
        className="absolute bottom-0 left-0 w-90 h-auto z-0" 
      />
      <img 
        src={rightVector} 
        alt="Right Vector" 
        className="absolute bottom-0 right-0 w-90 h-auto z-0" 
      />
      
      <div className="w-full max-w-sm space-y-4 rounded-md bg-white shadow-md sm:p-6 z-10">
        {/* Logo */}
        <div className="flex flex-col items-center justify-center">
          <div className="flex items-center justify-center text-sky-950">
            <img className="w-16 h-16" src={logImage} alt="TeamSync Logo" />
          </div>
          <h2 className="mt-1 text-center text-xl font-semibold text-gray-800">
            Log in to TeamSync
          </h2>
        </div>

        {/* Login Form */}
        <form className="mt-4 space-y-3">
          {/* Email */}
          <div className="flex justify-center">
            <input
              type="email"
              className="w-11/12 rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
              placeholder="Email address"
            />
          </div>
          
          {/* Password */}
          <div className="flex justify-center">
            <input
              type="password"
              className="w-11/12 rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
              placeholder="Password"
            />
          </div>

          {/* Forgot Password Link */}
          <div className="flex justify-end w-11/12">
            <a href="#" className="text-sm text-blue-500 hover:underline">
              Forgot password?
            </a>
          </div>

          {/* Login Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-11/12 rounded-md bg-blue-600 px-2 py-2 text-center font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2"
            >
              Log in
            </button>
          </div>
        </form>

        {/* OR divider */}
        <div className="relative mt-2">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white px-3 text-gray-500">Or continue with:</span>
          </div>
        </div>

        {/* Social login buttons */}
        <div className="mt-3 space-y-2 flex flex-col items-center">
          <button className="flex w-11/12 items-center justify-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
            <FcGoogle className="mr-2 h-6 w-6" />
            Google
          </button>
          <button className="flex w-11/12 items-center justify-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
            <div className='mr-2'>
              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25" viewBox="0 0 48 48">
                <path fill="#ff5722" d="M6 6H22V22H6z" transform="rotate(-180 14 14)"></path>
                <path fill="#4caf50" d="M26 6H42V22H26z" transform="rotate(-180 34 14)"></path>
                <path fill="#ffc107" d="M26 26H42V42H26z" transform="rotate(-180 34 34)"></path>
                <path fill="#03a9f4" d="M6 26H22V42H6z" transform="rotate(-180 14 34)"></path>
              </svg>
            </div>
            Microsoft
          </button>
        </div>

        {/* Sign up link */}
        <div className="mt-4 text-center text-sm">
          <span className="text-gray-600">Don't have an account?</span>{' '}
          <Link to="/user-sign-up" className="text-blue-500 hover:underline">
            Sign up
          </Link>
        </div>

        {/* Footer */}
        <div className="mt-6 border-t border-gray-200 pt-4">
          <div className="flex flex-col items-center justify-center">
            <div className="text-gray-500">TEAMSYNC</div>
            <p className="mt-1 text-center text-xs text-gray-500">
              By logging in, you acknowledge that you understand and agree to the application terms.
              <a href="#" className="text-blue-500 hover:underline"> more</a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;