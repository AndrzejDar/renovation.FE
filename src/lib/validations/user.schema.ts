import { z } from "zod";

export const LoginUserSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    // .min(1, "Email is required")
    .email("Email is invalid"),
  password: z
    .string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters")
    .refine(
      (password) => {
        const hasUppercase = /[A-Z]/.test(password);
        const hasNumber = /\d/.test(password);
        return hasUppercase && hasNumber;
      },
      {
        message:
          "Password must contain at least one uppercase letter and one number",
      }
    ),
});

export const ResetUserPasswordSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    // .min(1, "Email is required")
    .email("Email is invalid"),
});

export const ResetPasswordSchema = z
  .object({
    password: z
      .string({ required_error: "Password is required" })
      .min(1, "Password is required")
      .min(6, "Password must be at least 6 characters")
      .refine(
        (password) => {
          const hasUppercase = /[A-Z]/.test(password);
          const hasNumber = /\d/.test(password);
          return hasUppercase && hasNumber;
        },
        {
          message:
            "Password must contain at least one uppercase letter and one number",
        }
      ),
    confirm: z.string(),
    token: z.string().optional(),
  })
  .refine((data) => {
    return (
      data.password === data.confirm,
      {
        message: "Passwords don't match",
        path: ["confirm"], // path of error
      }
    );
  });

export const ChangeUserPasswordSchema = z
  .object({
    oldPassword: z.string().min(1, "Provide previous password"),
    newPassword: z
      .string({ required_error: "Provide new password" })
      .min(1, "Password is required")
      .min(6, "Password must be at least 6 characters")
      .refine(
        (password) => {
          const hasUppercase = /[A-Z]/.test(password);
          const hasNumber = /\d/.test(password);
          return hasUppercase && hasNumber;
        },
        {
          message:
            "Password must contain at least one uppercase letter and one number",
        }
      ),
    confirm: z.string().min(1, "Repeat new password"),
    token: z.string().optional(),
  })
  .refine(
    (data) => {
      return data.newPassword === data.confirm;
    },
    {
      message: "Passwords don't match",
      path: ["confirm"], // path of error
    }
  );

export const RegisterUserSchema = z
  .object({
    firstName: z
      .string({ required_error: "Name is required" })
      .min(1, "Name is required"),
    lastName: z
      .string({ required_error: "Surname is required" })
      .min(1, "Surname is required"),
    email: z
      .string({ required_error: "Email is required" })
      .email("Email is invalid"),
    password: z
      .string({ required_error: "Password is required" })
      .min(1, "Password is required")
      .min(6, "Password must be at least 6 characters")
      .refine(
        (password) => {
          const hasUppercase = /[A-Z]/.test(password);
          const hasNumber = /\d/.test(password);
          return hasUppercase && hasNumber;
        },
        {
          message:
            "Password must contain at least one uppercase letter and one number",
        }
      ),
    confirm: z.string(),
    phoneNumber: z.string().optional(),
    organisation: z.string().optional(),
    country: z.string().optional(),
  })
  .refine((data) => {
    return (
      data.password === data.confirm,
      {
        message: "Passwords don't match",
        path: ["confirm"], // path of error
      }
    );
  });

export const ChangeUserDataSchema = z.object({
  firstName: z
    .string({ required_error: "Name is required" })
    .min(1, "Name is required"),
  lastName: z
    .string({ required_error: "Surname is required" })
    .min(1, "Surname is required"),
  email: z
    .string({ required_error: "Email is required" })
    .email("Email is invalid"),
  phoneNumber: z.string().optional(),
  organisation: z.string().optional(),
  country: z.string().optional(),
});

export type LoginUserInput = z.infer<typeof LoginUserSchema>;
export type ResetUserPasswordInput = z.infer<typeof ResetUserPasswordSchema>;
export type ResetPasswordInput = z.infer<typeof ResetPasswordSchema>;
export type ResetPasswordPayload = Pick<
  ResetPasswordInput,
  "password" | "token"
>;

export type ChangeUserPasswordInput = z.infer<typeof ChangeUserPasswordSchema>;
export type ChangeUserPasswordPayload = Pick<
  ChangeUserPasswordInput,
  "oldPassword" | "newPassword"
>;

export type RegisterUserDataInput = z.infer<typeof RegisterUserSchema>;
export type ChangeUserDataInput = Pick<
  RegisterUserDataInput,
  | "firstName"
  | "lastName"
  | "email"
  | "phoneNumber"
  | "organisation"
  | "country"
>;
