import z from "zod";
// Sign Up Schema
export const signUpSchema = z
  .object({
    name: z
      .string()
      .min(2, "Name must be at least 2 characters")
      .max(50, "Name cannot exceed 50 characters")
      .trim(),

    email: z
      .string()
      .email("Please enter a valid email address")
      .toLowerCase()
      .trim(),

    password: z
      .string()
      .min(8, "8 characters")
      .max(100)
      .regex(/[A-Z]/, "one uppercase letter")
      .regex(/[a-z]/, "one lowercase letter")
      .regex(/[0-9]/, "one number")
      .regex(/[^A-Za-z0-9]/, "one special character"),

    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
// Sign In Schema
export const signInSchema = z.object({
  email: z.string().email("Invalid email address").trim(),
  password: z.string().min(1, "Password is required"),
});

export type signUpInput = z.infer<typeof signUpSchema>;
export type signInInput = z.infer<typeof signInSchema>;
