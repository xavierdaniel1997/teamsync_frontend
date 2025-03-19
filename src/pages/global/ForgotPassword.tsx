import { useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { FaFingerprint } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { EmailValidationData } from "../../types/auth";
import { useAuthMutations } from "../../hooks/useAuth";
import { toast } from "sonner";
import { FcGoogle } from "react-icons/fc";
import DotStreamLoading from "../../components/globa/DotStreamLoading";

const ForgotPassword = () => {
    const { forgotPassword } = useAuthMutations()
    const [otpSent, setOtpSent] = useState(false)

    const formik = useFormik({
        initialValues: {
            email: "",
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email("Invalid email address")
                .required("Email is required"),
        }),
        onSubmit: async (values, { setSubmitting, resetForm }) => {
            const data: EmailValidationData = { email: values.email };
            sessionStorage.setItem("userEmail", values.email)
            try {
                await forgotPassword.mutateAsync(data);
                resetForm();
                setOtpSent(true)
            } catch (error) {
                toast.error("Something went wrong");

            } finally {
                setSubmitting(false)
            }
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
                <h2 className="text-2xl font-semibold text-gray-800">Forgot password?</h2>
                <p className="text-gray-500">No worries, we’ll send you reset instructions.</p>

                {/* Form */}
                <form onSubmit={formik.handleSubmit} className="space-y-3">
                    <div className="text-left">
                        <label className="text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            placeholder="Enter your email"
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

                    {/* Reset Password Button */}
                    <button
                        type="submit"
                        className="w-full rounded-md bg-blue-600 px-4 py-2 text-white font-medium hover:bg-blue-700 transition"
                        disabled={formik.isSubmitting}
                    >
                        {/* Reset password */}
                        <DotStreamLoading loading={formik.isSubmitting} fallback={"Reset Password"}/>
                    </button>
                

                {otpSent && (
                    <div>
                    <a className="flex w-full items-center justify-center rounded-sm border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 cursor-pointer hover:bg-gray-200 hover:shadow-md"
                     href="https://mail.google.com/"
                    >
                        <FcGoogle className="mr-2 h-6 w-6" />
                        Open Gmail
                    </a>
                    </div>
                )}
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

export default ForgotPassword;