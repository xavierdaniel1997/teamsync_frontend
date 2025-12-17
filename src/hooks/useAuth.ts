import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authService } from "../services/authService";
import {
  CreateNewPasswordData,
  CreateProfileData,
  EmailValidationData,
  LoginData,
  OtpValidationData,
} from "../types/auth";
import { useDispatch } from "react-redux";
import { logout, setCredentials } from "../redux/authSlice";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import {
  setSelectWorkspace,
  setSelectWorkspaceId,
} from "../redux/workspaceSlice";
import { handleWorkspaceSelection } from "../utils/workspaceUtils";
import { setSelectProject, setSelectProjectId } from "../redux/projectSlice";

export const useAuthMutations = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validateEmail = useMutation({
    mutationFn: (data: EmailValidationData) => authService.validateEmail(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["emailValidation"] });
    },
    onError: (error) => {
      console.error("Email validation error", error);
      console.log(error);
    },
  });

  const validateOtp = useMutation({
    mutationFn: (data: OtpValidationData) => authService.validateOtp(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["otpValidation"] });
    },
    onError: (error) => {
      console.error("Otp validation error", error);
    },
  });

  // resendOtp
  const resendOtp = useMutation({
    mutationFn: (data: EmailValidationData) => authService.resendOtp(data),
    onSuccess: () => {
      console.log("OTP resent successfully");
    },
    onError: (error) => {
      console.error("Failed to resend OTP", error);
    },
  });

  const createProfile = useMutation({
    mutationFn: (data: CreateProfileData) => authService.createProfile(data),
    onSuccess: async (response) => {
      const { userDetial, accessToken } = response.data;
      dispatch(setCredentials({ user: userDetial, accessToken }));
      const inviteToken = sessionStorage.getItem("inviteToken");
      if (inviteToken) {
        navigate(`/invite/accept?token=${inviteToken}`);
        return;
      }
      queryClient.invalidateQueries({ queryKey: ["createProfile"] });
      navigate("/create-work-space");
    },
    onError: (error) => {
      console.error("create Profile error", error);
    },
  });

  const loginUser = useMutation({
    mutationFn: (data: LoginData) => authService.loginUser(data),
    onSuccess: async (response) => {
      console.log("user login details", response)
      const { userData, accessToken } = response.data;
      dispatch(setCredentials({ user: userData, accessToken }));
      const inviteToken = sessionStorage.getItem("inviteToken");
      if (inviteToken) {
        navigate(`/invite/accept?token=${inviteToken}`);
        return;
      }
      try {
        await handleWorkspaceSelection(dispatch, navigate);
      } catch (error) {
        console.log("Failed to fetch the workspace", error);
        navigate("/create-work-space");
      }
    },
    onError: (error) => {
      console.log("Failed to login", error);
    },
  });

  const loginWithGoogle = useMutation({
    mutationFn: (accessToken: string) =>
      authService.loginWithGoogle(accessToken),
    onSuccess: async (response) => {
      const { user, accessToken } = response.data;
      dispatch(setCredentials({ user, accessToken }));
      const inviteToken = sessionStorage.getItem("inviteToken");
      if (inviteToken) {
        navigate(`/invite/accept?token=${inviteToken}`);
        return;
      }
      try {
        await handleWorkspaceSelection(dispatch, navigate);
      } catch (error) {
        navigate("/create-work-space");
      }
    },
    onError: (error) => {
      console.log("Google login failed", error);
    },
  });

  const forgotPassword = useMutation({
    mutationFn: (data: EmailValidationData) => authService.forgotPassword(data),
    onSuccess: (res) => {
      toast.success(res.message);
      // console.log("Forgot password success:", res);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message);
      console.error("Forgot password error:", error);
    },
  });

  const createNewPassword = useMutation({
    mutationFn: (data: CreateNewPasswordData) =>
      authService.createNewPassword(data),
    onSuccess: (res) => {
      toast.success(res.message);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Reset failed");
    },
  });

  const logoutUser = useMutation({
    mutationFn: async () => authService.logoutUserApi,
    onSuccess: (res) => {
      dispatch(logout());
      dispatch(setSelectWorkspaceId(null));
      dispatch(setSelectWorkspace(null));
      dispatch(setSelectProjectId(null))
      dispatch(setSelectProject(null))
      console.log("logout successfully", res);
    },
    onError: (error) => {
      console.log("faied to login", error);
    },
  });

  return {
    validateEmail,
    validateOtp,
    createProfile,
    loginUser,
    loginWithGoogle,
    resendOtp,
    forgotPassword,
    createNewPassword,
    logoutUser,
  };
};
