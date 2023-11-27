import { z } from "zod";

// export const LoginUserSchema = z.object({
//   email: z
//     .string({ required_error: "Email is required" })
//     // .min(1, "Email is required")
//     .email("Email is invalid"),
//   password: z
//     .string({ required_error: "Password is required" })
//     .min(1, "Password is required")
//     .min(6, "Password must be at least 6 characters")
//     .refine(
//       (password) => {
//         const hasUppercase = /[A-Z]/.test(password);
//         const hasNumber = /\d/.test(password);
//         return hasUppercase && hasNumber;
//       },
//       {
//         message:
//           "Password must contain at least one uppercase letter and one number",
//       }
//     ),
// });

export const NewProjectDataSchema = z.object({
  name: z.string().min(1, "Project name is required"),
  customer: z.string().optional(),
  description: z.string().optional(),
  tags: z.string().optional(),
  //   tags: z.array(z.string().optional()).optional(),
});

export interface NewProjectDataPayload {
  name: string;
  customer?: string;
  description?: string;
  tags?: string[];
}

export interface ProjectData {
  archived: boolean;
  createdBy: number;
  customer: string;
  description: string;
  id: number;
  imagePath: string;
  name: string;
  tags: [];
  uuid: string;
  createdAt: string;
}

export type NewProjectDataInput = z.infer<typeof NewProjectDataSchema>;
// export type ResetPasswordPayload = Pick<
//   ResetPasswordInput,
//   "password" | "token"
// >;
