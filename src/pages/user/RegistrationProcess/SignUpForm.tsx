import logImage from "../../../assets/teamsync-log.png";
import leftVector from "../../../assets/leftVector.png";
import rightVector from "../../../assets/rightVector.png";
import { Link } from "react-router-dom";
import LoginWithThirdParty from "../../global/LoginWithThirdParty";
import { useAuthMutations } from "../../../hooks/useAuth";
import {
  EmailValidationData,
  EmailValidationResponse,
} from "../../../types/auth";
import { useFormik } from "formik";
import * as Yup from "yup";
import { DotStream } from "ldrs/react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";






const SignUpForm: React.FC = () => {
  const { validateEmail } = useAuthMutations();
  const navigate = useNavigate()

  // Formik setup
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
    }),
    onSubmit: (values, { setSubmitting, resetForm }) => {
      const data: EmailValidationData = { email: values.email };
      validateEmail.mutate(data, {
        onSuccess: (response: EmailValidationResponse) => {
          sessionStorage.setItem("userEmail", values.email)
          toast.success("Email validated successfully!");
          // toast.success("Email validated successfully!", {
          //   duration: 2000, 
          //   onAutoClose: () => navigate("/verify-otp"), 
          // });
          resetForm();
          navigate("/verify-otp");
          // setTimeout(() => {
          //   navigate("/verify-otp");
          // }, 2000);
          console.log("Validated email:", response);
        },
        onError: () => {
          formik.setFieldError("email", "Email validation failed");
        },
        onSettled: () => {
          setSubmitting(false);
        },
      });
    },
  });



  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-2 py-8 sm:px-4 lg:px-6 relative">
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

      <div className="w-full max-w-sm space-y-3 rounded-b-md bg-white shadow-md sm:p-6 z-10">
        <div className="flex flex-col items-center justify-center">
          <div className="flex items-center justify-center text-sky-950">
            <img className="w-16 h-16" src={logImage} alt="TeamSync Logo" />
          </div>

          <h2 className="mt-1 text-center text-xl font-semibold text-gray-800">
            Sign up to continue
          </h2>
        </div>

        <form className="mt-4 space-y-4" onSubmit={formik.handleSubmit}>
          <div className="flex justify-center">
            <div className="w-11/12">
              <input
                type="email"
                className={`w-full rounded-sm border px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-blue-500 ${formik.touched.email && formik.errors.email
                    ? "border-red-500"
                    : "border-gray-300"
                  }`}
                placeholder="Enter your email"
                {...formik.getFieldProps("email")}
              />
              {formik.touched.email && formik.errors.email && (
                <div className="text-red-500 text-xs mt-1">
                  {formik.errors.email}
                </div>
              )}
            </div>
          </div>

          <div className="text-xs text-gray-600 px-3">
            Use an organization email to easily collaborate with teammates.
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              disabled={formik.isSubmitting}
              className={`w-full flex items-center justify-center rounded-sm px-4 py-2 font-medium text-white ${formik.isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
                }`}
            >
              {formik.isSubmitting ? (
                <div className="flex items-center gap-2">
                <DotStream size={26} speed={2.5} color="white" />
                <span>Sending...</span>
              </div>
              ) : "Enter"}
            </button>

          </div>
        </form>

        <LoginWithThirdParty />

        <div className="mt-4 text-center text-sm">
          <span className="text-gray-600">
            Already have an Teamsync account?
          </span>{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Log in
          </Link>
        </div>

        <div className="mt-6 border-t border-gray-200 pt-4">
          <div className="flex flex-col items-center justify-center">
            <div className="text-gray-500">TEAMSYNC</div>
            <p className="mt-1 text-center text-xs text-gray-500">
              Your name and photo are displayed to users who invite you to a
              workspace using your email. By continuing, you acknowledge that
              you understand and agree to the application.
              <a href="#" className="text-blue-500 hover:underline">
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


export default SignUpForm;

