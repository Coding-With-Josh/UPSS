import { z } from "zod"

const ClassEnum = z.enum(['JSS1', 'JSS2', 'JSS3', 'SS1', 'SS2', 'SS3'])
const ArmEnum = z.enum(['Silver', 'Gold', 'Platinum', 'Copper', 'Mecury', 'Diamond', 'Titanium', 'Silicon'])
const RoleEnum = z.enum(['ADMIN', 'TEACHER', 'STUDENT'])
const GenderEnum = z.enum(['MALE', 'FEMALE', 'OTHER'])

export const SignUpSchema = z
  .object({
    firstName: z.string().min(2, "First name must be at least 2 characters"),
    lastName: z.string().min(2, "Last name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email"),
    username: z.string().min(2).max(50),
    password: z.string().min(8, { message: "Password must be at least 8 characters long" }),
    confirmPassword: z.string().min(8, {
      message: "Password must be at least 8 characters long"
    }),
    role: RoleEnum,
    gender: GenderEnum,
    class: ClassEnum,
    arm: ArmEnum,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

export const SignInSchema = z.object({
  username: z.string().min(2).max(50),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
})

export const ResetPasswordSchema = z
  .object({
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
    newPassword: z.string().min(8),
    logoutFromOtherDevices: z.boolean(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })
  .refine((data) => data.newPassword !== data.password, {
    message: "New password must be different from the current password",
    path: ["newPassword"],
  })