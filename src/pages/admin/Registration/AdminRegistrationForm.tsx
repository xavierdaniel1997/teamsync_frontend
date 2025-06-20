
import logImage from "../../../assets/teamsync-log.png";
import leftVector from "../../../assets/leftVector.png";
import rightVector from "../../../assets/rightVector.png";
import { useFormik } from "formik";
import * as Yup from 'yup'
import { useAdminAuthMutation } from "../../../hooks/useAdminAuth";
import { CreateProfileData } from "../../../types/auth";
import { toast } from "sonner";
import { Link } from "react-router-dom";

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



const AdminRegistrationForm: React.FC = () => {
  const {adminRegister} = useAdminAuthMutation()

  const formik = useFormik({
    initialValues: {
      email: "",
      fullName: "",
      password: "",
      cpassword: "",
    },
    validationSchema,
    onSubmit: async (values, {resetForm}) => {
      const data: CreateProfileData = {
        email: values.email,
        fullName: values.fullName,
        password: values.password,
        cpassword: values.cpassword
    };
      adminRegister.mutate(data, {
        onSuccess: () => {
          toast.success("Registration successfull")
          resetForm()
        }
      })
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
        {/* Logo and Header */}
        <div className="flex flex-col items-center justify-center">
          <div className="flex items-center justify-center text-sky-950">
            <img className="w-16 h-16" src={logImage} alt="TeamSync Logo" />
          </div>
          <h2 className="mt-1 text-center text-xl font-semibold text-gray-800">
            Admin Registration
          </h2>
          <div className="mt-1 px-4 text-center text-sm text-gray-600">
            Create your admin account to manage teams and resources
          </div>
        </div>

        {/* Registration Form */}
        <form className="mt-4 space-y-4" onSubmit={formik.handleSubmit}>
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
                <div className="text-red-500 text-sm mt-1">{formik.errors.email}</div>
              )}
              </div>
          </div>
          
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
              placeholder="Password"
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

          {/* Password Requirements */}
          <div className="flex justify-center">
            <div className="w-11/12 px-1 text-xs text-gray-500">
              Password must be at least 8 characters and include uppercase, lowercase, numbers, and special characters
            </div>
          </div>

          {/* Register Button */}
          <div className="flex justify-center mt-2">
            <button
              type="submit"
              className="w-11/12 rounded-md bg-blue-600 px-4 py-2 text-center font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 transition-colors duration-200 shadow-sm"
            >
              Create Admin Account
            </button>
          </div>
        </form>

        {/* OR divider */}
        


        {/* Login link */}
        <div className="mt-4 text-center text-sm">
          <span className="text-gray-600">Already have an admin account?</span>{' '}
          <Link to="/admin/login" className="text-blue-500 hover:underline">
            Log in
          </Link>
        </div>

        {/* Footer */}
        <div className="mt-4 border-t border-gray-200 pt-4">
          <div className="flex flex-col items-center justify-center">
            <div className="text-gray-500">TEAMSYNC</div>
            <p className="mt-1 text-center text-xs text-gray-500">
              Admin accounts have extended privileges. By registering, you acknowledge that you understand and agree to the application terms and admin responsibilities.
              <a href="#" className="text-blue-500 hover:underline"> more</a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminRegistrationForm;