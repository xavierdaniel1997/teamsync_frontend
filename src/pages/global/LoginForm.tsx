import {FcGoogle} from "react-icons/fc";
import logImage from "../../assets/teamsync-log.png";
import leftVector from "../../assets/leftVector.png";
import rightVector from "../../assets/rightVector.png";
import {Link} from "react-router-dom";
import LoginWithThirdParty from "./LoginWithThirdParty";
import {useFormik} from "formik";
import * as Yup from "yup";
import {LoginData} from "../../types/auth";
import {useAuthMutations} from "../../hooks/useAuth";
import {toast} from "sonner";

const LoginForm: React.FC = () => {
  const {loginUser} = useAuthMutations();

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values, {setSubmitting, resetForm}) => {
      try {
        const data: LoginData = {
          email: values.email,
          password: values.password,
        };
        const response = await loginUser.mutateAsync(data, {
          onSuccess: (response) => {
            console.log("response form the login page ", response);
            toast.success(response.message);
            resetForm();
          },
        });
      } catch (error: any) {
        console.log("Failed to login");
      }
    },
  });

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
        <form className="mt-4 space-y-3" onSubmit={formik.handleSubmit}>
          {/* Email */}
          <div className="flex justify-center">
            <div className="w-11/12 space-y-1">
              <input
                type="email"
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                placeholder="Email address"
                name="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              {formik.touched.email && formik.errors.email && (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.email}
                </div>
              )}
            </div>
          </div>

          {/* Password */}
          <div className="flex justify-center">
            <div className="w-11/12 space-y-1">
              <input
                type="password"
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                placeholder="Password"
                name="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
              {formik.touched.password && formik.errors.password && (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.password}
                </div>
              )}
            </div>
          </div>

          {/* Forgot Password Link */}
          <div className="flex justify-end w-11/12">
            <Link to="/forgot-password" className="text-sm text-blue-500 hover:underline">
              Forgot password?
            </Link>
          </div>

          {/* Login Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-11/12 rounded-md bg-blue-600 px-2 py-2 text-center font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2"
              disabled={formik.isSubmitting}
            >
              Log in
            </button>
          </div>
        </form>

        {/* third party login */}
        <LoginWithThirdParty />

        {/* Sign up link */}
        <div className="mt-4 text-center text-sm">
          <span className="text-gray-600">Don't have an account?</span>{" "}
          <Link to="/user-sign-up" className="text-blue-500 hover:underline">
            Sign up
          </Link>
        </div>

        {/* Footer */}
        <div className="mt-6 border-t border-gray-200 pt-4">
          <div className="flex flex-col items-center justify-center">
            <div className="text-gray-500">TEAMSYNC</div>
            <p className="mt-1 text-center text-xs text-gray-500">
              By logging in, you acknowledge that you understand and agree to
              the application terms.
              <a href="#" className="text-blue-500 hover:underline">
                {" "}
                more
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
