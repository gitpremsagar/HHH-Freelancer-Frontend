import { z } from "zod";
import { APP_ROLES } from "@/lib/constants/app-role";
// Validation schemas
const signUpSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Confirm password must be at least 6 characters"),
  isFreelancer: z.boolean().optional().default(false),
  isClient: z.boolean().optional().default(false),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

const loginSchema = z.object({
  email: z.email("Invalid email format"),
  password: z.string().min(1, "Password is required"),
});

const forgotPasswordSchema = z.object({
  email: z.email("Invalid email format"),
});

const resetPasswordSchema = z.object({
  token: z.string().min(1, "Reset token is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const verifyEmailSchema = z.object({
  token: z.string().min(1, "Verification token is required"),
});

const verifyPhoneSchema = z.object({
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  code: z.string().min(4, "Verification code must be at least 4 digits"),
});

const setUserRoleSchema = z.object({
  userId: z.string().min(1, "User ID is required"),
  role: z.enum(APP_ROLES),
});

const deleteUserRoleSchema = z.object({
  userId: z.string().min(1, "User ID is required"),
  role: z.enum(APP_ROLES),
});

export {
  signUpSchema,
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  verifyEmailSchema,
  verifyPhoneSchema,
  setUserRoleSchema,
  deleteUserRoleSchema,
};
