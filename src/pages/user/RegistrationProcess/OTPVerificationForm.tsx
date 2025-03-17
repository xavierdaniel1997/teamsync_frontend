import { useState, useEffect, useRef, ChangeEvent, KeyboardEvent, ClipboardEvent, FormEvent } from "react";
import logImage from "../../../assets/teamsync-log.png";
import leftVector from "../../../assets/leftVector.png";
import rightVector from "../../../assets/rightVector.png";

import { useAuthMutations } from "../../../hooks/useAuth";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { OtpValidationData } from "../../../types/auth";


const OTPVerificationForm: React.FC = () => {
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState<number>(60);
  const [canResend, setCanResend] = useState<boolean>(false);
  const inputRefs = useRef<HTMLInputElement[] >([]);

  const { validateOtp } = useAuthMutations()
  const navigate = useNavigate()



  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  const handleChange = (index: number, value: string): void => {
    if (isNaN(Number(value))) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>): void => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6).split("");

    if (pastedData.some(char => isNaN(Number(char)))) return;

    const newOtp = [...otp];
    pastedData.forEach((value, i) => {
      if (i < 6) newOtp[i] = value;
    });

    setOtp(newOtp);


    const lastFilledIndex = Math.min(pastedData.length - 1, 5);
    inputRefs.current[lastFilledIndex].focus();
  };

  const handleResendOTP = (): void => {
    setTimer(60);
    setCanResend(false);
    setOtp(["", "", "", "", "", ""]);
    inputRefs.current[0].focus();

    console.log("Resending OTP...");
  };




  const userEmail = sessionStorage.getItem("userEmail") || ""

  const formik = useFormik({
    initialValues: {
      email: userEmail,
      otpCode: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      otpCode: Yup.string()
        .length(6, "OTP must be 6 digits")
        .matches(/^[0-9]+$/, "OTP must contain only numbers")
        .required("OTP is required"),
    }),
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        const otpData: OtpValidationData = {
          email: values.email,
          otpCode: otp.join("")
        };
        await validateOtp.mutateAsync(otpData, {
          onSuccess: () => {
            toast.success("OTP verified successfully");
            resetForm()
            setTimeout(() => {
              navigate("/set-up-profile")
            }, 600)

          },
          onError: (error) => {
            toast.error(error.message || "Invalid OTP. Please try again.");
          }
        });
      } catch (error) {
        console.log(error)
        toast.error("An error occurred. Please try again.");
      } finally {
        setSubmitting(false);
      }
    },
  })


  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const otpValue = otp.join("");
    
    if (otpValue.length === 6) {
      await formik.setFieldValue("otpCode", otpValue);
      formik.handleSubmit();
    } else {
      toast.error("Please enter a 6-digit OTP");
    }
  };


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

      <div className="w-full max-w-sm space-y-4 rounded-md bg-white shadow-md sm:p-6 z-10">
        <div className="flex flex-col items-center justify-center">
          <div className="flex items-center justify-center text-sky-950">
            <img className="w-16 h-16" src={logImage} alt="TeamSync Logo" />
          </div>
          <h2 className="mt-1 text-center text-xl font-semibold text-gray-800">
            Verify your email
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            We've sent a verification code to
          </p>
          <p className="text-center text-sm font-medium text-gray-800">
            {userEmail}
          </p>
        </div>

        {/* OTP Form */}
        <form className="mt-4 space-y-6" onSubmit={handleSubmit}>
          <div className="flex justify-center space-x-2">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el: HTMLInputElement) => inputRefs.current[index] = el}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(index, e.target.value)}
                onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => handleKeyDown(index, e)}
                onPaste={index === 0 ? handlePaste : undefined}
                className="w-12 h-12 text-center rounded-md border border-gray-300 text-gray-900 text-xl font-semibold focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                autoFocus={index === 0}
              />
            ))}
          </div>

          <div className="flex justify-center">
            {/* <button
              type="submit"
              className="w-11/12 rounded-md bg-blue-600 px-4 py-2 text-center font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 disabled:bg-blue-300"
              disabled={otp.join("").length !== 6}
            >
              Verify
            </button> */}
            <button
              type="submit"
              className="w-11/12 rounded-md bg-blue-600 px-4 py-2 text-center font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 disabled:bg-blue-300"
              disabled={otp.join("").length !== 6}
            >
              Verify
            </button>
          </div>
        </form>

        {/* Timer and Resend */}
        <div className="flex flex-col items-center mt-4">
          <div className="text-sm text-gray-600">
            {timer > 0 ? (
              <>Resend code in <span className="font-medium">{timer}s</span></>
            ) : (
              <button
                onClick={handleResendOTP}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Resend Code
              </button>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 border-t border-gray-200 pt-4">
          <div className="flex flex-col items-center justify-center">
            <div className="text-gray-500">TEAMSYNC</div>
            <p className="mt-1 text-center text-xs text-gray-500">
              This verification is used to secure your account. By continuing, you acknowledge that you understand and agree to the application.
              <a href="#" className="text-blue-500 hover:underline"> more</a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OTPVerificationForm;