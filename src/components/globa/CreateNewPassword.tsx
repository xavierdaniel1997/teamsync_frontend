import { FiArrowLeft } from "react-icons/fi";
import { FaFingerprint } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { useAuthMutations } from "../../hooks/useAuth";
import * as Yup from 'yup';
import { useFormik } from "formik";
import { CreateNewPasswordData } from "../../types/auth";
import { toast } from "sonner";


const validationSchema = Yup.object({
    password: Yup.string()
        .required('Password is required')
        .min(8, 'Password must be at least 8 characters'),
    cpassword: Yup.string()
        .required('Please confirm your password')
        .oneOf([Yup.ref('password')], 'Passwords must match')
});

const CreateNewPassword = () => {
    const { token, email } = useParams();

    const { createNewPassword } = useAuthMutations();

    const formik = useFormik({
        initialValues: {
            password: "",
            cpassword: ""
        },
        validationSchema,
        onSubmit: async (values, { setSubmitting, resetForm }) => {
            if (!token || !email) return;
            await createNewPassword.mutateAsync({ 
                newPassword: values.password,
                cpassword: values.cpassword,
                token,
                email
             }, {
                onSuccess: (response) => {
                    console.log("response from the create new password", response)
                    resetForm()
                 },
                 onError: (error: any) => {
                    toast.error(error?.response?.data?.message || "Reset failed");
                  }
            })
            setSubmitting(false)
        }

    })
    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
            <div className="text-center space-y-6">
                {/* Fingerprint Icon */}
                <div className="flex justify-center">
                    <FaFingerprint className="text-4xl text-gray-600" />
                </div>

                {/* Title */}
                <h2 className="text-2xl font-semibold text-gray-800">Create New password?</h2>
                <p className="text-gray-500">Enter your new password below.</p>

                {/* Form */}
                <form className="space-y-3" onSubmit={formik.handleSubmit}>
                    {/* New Password */}
                    <div className="text-left">
                        <label className="text-sm font-medium text-gray-700">New Password</label>
                        <input
                            type="password"
                            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            placeholder="Enter new password"
                            name="password"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.password}
                        />
                        {formik.touched.password && formik.errors.password && (
                            <div className="text-red-500 text-sm mt-1">{formik.errors.password}</div>
                        )}
                    </div>

                    {/* Confirm Password */}
                    <div className="text-left">
                        <label className="text-sm font-medium text-gray-700">Confirm Password</label>
                        <input
                            type="password"
                            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            placeholder="Confirm new password"
                            name="cpassword"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.cpassword}
                        />
                        {formik.touched.password && formik.errors.cpassword && (
                            <div className="text-red-500 text-sm mt-1">{formik.errors.cpassword}</div>
                        )}
                    </div>

                    {/* Reset Password Button */}
                    <button
                        type="submit"
                        className="w-full rounded-md bg-blue-600 px-4 py-2 text-white font-medium hover:bg-blue-700 transition"
                    >
                        Reset Password
                    </button>
                </form>

                {/* Back to login */}
                <div className="flex justify-center items-center space-x-2 text-sm text-gray-600 hover:text-gray-800 transition">
                    <FiArrowLeft className="text-lg" />
                    <Link to="/login">Back to log in</Link>
                </div>
            </div>
        </div>
    );
};

export default CreateNewPassword;
