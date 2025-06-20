// import { FcGoogle } from "react-icons/fc";
import logImage from "../../../assets/teamsync-log.png";
import leftVector from "../../../assets/leftVector.png";
import rightVector from "../../../assets/rightVector.png";
import LoginWithThirdParty from "../../global/LoginWithThirdParty";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAuthMutations } from "../../../hooks/useAuth";
import { CreateProfileData } from "../../../types/auth";
import { toast } from "sonner";
import { Link } from "react-router-dom";


const ProfileSetupForm: React.FC = () => {
  const { createProfile } = useAuthMutations()

  const userEmail = sessionStorage.getItem("userEmail") || ""

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    fullName: Yup.string()
      .required('Full name is required')
      .min(2, 'Full name must be at least 2 characters'),
    password: Yup.string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters'),
    cpassword: Yup.string()
      .required('Please confirm your password')
      .oneOf([Yup.ref('password')], 'Passwords must match')
  });

  const formik = useFormik({
    initialValues: {
      email: userEmail,
      fullName: "",
      password: "",
      cpassword: "",
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        const data: CreateProfileData = {
          email: values.email,
          fullName: values.fullName,
          password: values.password,
          cpassword: values.cpassword
        }
        const response = await createProfile.mutateAsync(data, {
          onSuccess: () => {
            toast.success("User Registration successfully")
            resetForm()
          },
          onError: (error) => {
            console.error("create Profile error", error);
          },
        })
        sessionStorage.removeItem('userEmail')
        console.log("response form the createProfile", response)
      } catch (error) {
        console.log("Profile creation failed:", error);
        toast.error("Profile creation failed");
      } finally {
        setSubmitting(false);
      }
    }
  })

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
            Complete your profile
          </h2>
        </div>



        {/* Form */}
        <form className="mt-4 space-y-4" onSubmit={formik.handleSubmit}>
          {/* Full Name */}
          <div className="flex justify-center">
            <div className="w-11/12 space-y-1">
              <input
                type="text"
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                placeholder="Full Name"
                name="fullName"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.fullName}
              />
              {formik.touched.fullName && formik.errors.fullName && (
                <div className="text-red-500 text-sm mt-1">{formik.errors.fullName}</div>
              )}
            </div>
          </div>

          {/* Password */}
          <div className="flex justify-center">
            <div className="w-11/12 space-y-1">
              <input
                type="password"
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                placeholder="Create Password"
                name="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
              {formik.touched.password && formik.errors.password && (
                <div className="text-red-500 text-sm mt-1">{formik.errors.password}</div>
              )}
            </div>
          </div>

          {/* Confirm Password */}
          <div className="flex justify-center">
            <div className="w-11/12 space-y-1">
              <input
                type="password"
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                placeholder="Confirm Password"
                name="cpassword"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.cpassword}
              />
              {formik.touched.cpassword && formik.errors.cpassword && (
                <div className="text-red-500 text-sm mt-1">{formik.errors.cpassword}</div>
              )}
            </div>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="w-11/12 rounded-md bg-blue-600 px-4 py-2 text-center font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2"
              disabled={formik.isSubmitting}
            >
              Create Account
            </button>
          </div>
        </form>

        {/* OR divider */}
        <LoginWithThirdParty />

        {/* Login link */}
        <div className="mt-4 text-center text-sm">
          <span className="text-gray-600">Already have an Teamsync account?</span>{' '}
          <Link to="/login" className="text-blue-500 hover:underline">
            Log in
          </Link>
        </div>

        {/* Footer */}
        <div className="mt-6 border-t border-gray-200 pt-4">
          <div className="flex flex-col items-center justify-center">
            <div className="text-gray-500">TEAMSYNC</div>
            <p className="mt-1 text-center text-xs text-gray-500">
              Your profile information is used to enhance your experience. By continuing, you acknowledge that you understand and agree to the application.
              <a href="#" className="text-blue-500 hover:underline"> more</a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSetupForm;