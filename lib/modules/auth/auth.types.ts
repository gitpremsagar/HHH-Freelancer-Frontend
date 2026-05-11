import type { AppRole } from "@/lib/constants/app-role";

// Auth API Request Types
export type SignUpRequest = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  isFreelancer: boolean;
  isClient: boolean;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type ForgotPasswordRequest = {
  email: string;
};

export type ResetPasswordRequest = {
  token: string;
  password: string;
};

export type VerifyEmailRequest = {
  token: string;
};

export type VerifyPhoneRequest = {
  phone: string;
  code: string;
};

export type SetUserRoleRequest = {
  userId: string;
  role: AppRole;
};

export type DeleteUserRoleRequest = {
  userId: string;
  role: AppRole;
};

// Auth API Response Types
export type GetRefreshedAccessTokenResponse = {
  success: boolean;
  message: string;
  data: {
    user: User;
    accessToken: string;
  };
};

export type SignUpResponse = {
  success: boolean;
  message: string;
  user?: User;
};

export type LoginResponse = {
  success: boolean;
  message: string;
  data: {
    user?: User;
    accessToken?: string;
  };
};

export type ForgotPasswordResponse = {
  success: boolean;
  message: string;
};

export type ResetPasswordResponse = {
  success: boolean;
  message: string;
};

export type VerifyEmailResponse = {
  success: boolean;
  message: string;
};

export type VerifyPhoneResponse = {
  success: boolean;
  message: string;
};

export type SetUserRoleResponse = {
  success: boolean;
  message: string;
};

export type DeleteUserRoleResponse = {
  success: boolean;
  message: string;
};

// User Types
export type User = {
    name: string;
    id: string;
    email: string;
    isFreelancer: boolean;
    isClient: boolean;
    address: string | null;
    phone: string | null;
    website: string | null;
    bio: string | null;
    avatar: string | null;
    country: string | null;
    state: string | null;
    city: string | null;
    zip: string | null;
    latitude: number | null;
    longitude: number | null;
    isActive: boolean;
    isEmailVerified: boolean;
    isPhoneVerified: boolean;
    isDeleted: boolean;
    isArchived: boolean;
    isSuspended: boolean;
    isBlocked: boolean;
    isMemberOfWaitlist: boolean | null;
    createdAt: Date;
    updatedAt: Date;
};

// Form Data Types (for form handling)
export type SignUpFormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  isFreelancer: boolean;
  isClient: boolean;
};

export type LoginFormData = {
  email: string;
  password: string;
};
