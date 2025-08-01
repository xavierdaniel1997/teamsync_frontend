
import logImage from "../../assets/teamsync-log.png";
import leftVector from "../../assets/leftVector.png";
import rightVector from "../../assets/rightVector.png";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { LoginData } from "../../types/auth";
import { toast } from "sonner";
import LoginWithThirdParty from "./LoginWithThirdParty";

interface LoginFormProps {
  title: string;
  loginMutation: any; 
  signUpLink: string;
  forgotPasswordLink?: string;
  onSuccessRedirect?: () => void; 
  isAdmin: boolean;
  // isLoading: boolean;
  // isGoogleLoading?: boolean;
}

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
});

const LoginForm: React.FC<LoginFormProps> = ({
  title,
  loginMutation,
  signUpLink,
  forgotPasswordLink = "/forgot-password",
  onSuccessRedirect,
  isAdmin,
}) => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        const data: LoginData = {
          email: values.email,
          password: values.password,
        };
        await loginMutation.mutateAsync(data, {
          onSuccess: (response: any) => {
            toast.success(response.message || "Logged in successfully");
            resetForm();
            if (onSuccessRedirect) onSuccessRedirect();
          },
        });
      } catch (error: any) {
        console.log(`Failed to login (${title}):`, error.response?.data?.message);
        toast.error(error.response?.data?.message || "Failed to login");
      } finally {
        setSubmitting(false);
      }
    },
  });

  console.log("checking the isloading pending....", )

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#191919]  px-2 py-8 sm:px-4 lg:px-6 relative">
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

      <div className="w-full max-w-sm space-y-4 rounded-md bg-[#1d1d1d] shadow-md sm:p-6 z-10">
        <div className="flex flex-col items-center justify-center">
          <div className="flex items-center justify-center text-sky-950">
            <img className="w-16 h-16" src={logImage} alt="TeamSync Logo" />
          </div>
          <h2 className="mt-1 text-center text-xl font-semibold text-gray-300">
            {title}
          </h2>
        </div>

        <form className="mt-4 space-y-3" 
        onSubmit={formik.handleSubmit}
        >
          <div className="flex justify-center">
            <div className="w-11/12 space-y-1">
              <input
                type="email"
                className="w-full rounded-md border border-gray-400 px-3 py-2 text-gray-300 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
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

          <div className="flex justify-center">
            <div className="w-11/12 space-y-1">
              <input
                type="password"
                className="w-full rounded-md border border-gray-400 px-3 py-2 text-gray-300 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
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

          <div className="flex justify-end w-11/12">
            <Link to={forgotPasswordLink} className="text-sm text-blue-500 hover:underline">
              Forgot password?
            </Link>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="w-11/12 rounded-md bg-blue-600/50 px-2 py-2 text-center font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 disabled:bg-gray-400"
              disabled={formik.isSubmitting || loginMutation.isPending}
            >
              {loginMutation.isPending ? "Logging in..." : "Log in"}
            </button>
          </div>
        </form>

        {!isAdmin && <LoginWithThirdParty />}

        <div className="mt-4 text-center text-sm">
          <span className="text-gray-300">Don't have an account?</span>{" "}
          <Link to={signUpLink} className="text-blue-500 hover:underline">
            Sign up
          </Link>
        </div>

        <div className="mt-6 border-t border-gray-600 pt-4">
          <div className="flex flex-col items-center justify-center">
            <div className="text-gray-400">TEAMSYNC</div>
            <p className="mt-1 text-center text-xs text-gray-400">
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