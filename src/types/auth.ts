export interface EmailValidationData {
    email: string;
}

export interface EmailValidationResponse {
    email: string;
    message: string;
}

export interface OtpValidationData {
    email: string;
    otpCode: string;
}

export interface CreateProfileData {
    email: string;
    fullName: string;
    password: string;
    cpassword: string; 
    avatar?: string; 
}

export interface ErrorResponse {
    success: boolean;
    status: number;
    message: string;
    data: null;
  }