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

export interface LoginData {
    email: string;
    password: string;
}

export interface ErrorResponse {
    success: boolean;
    status: number;
    message: string;
    data?: any;
}

export interface CreateNewPasswordData {
    newPassword: string;
    cpassword: string;
    token: string; 
    email: string,
}


//admin components
