import {z} from "zod";

export const SignInFormSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6).max(32)
})

export const SignUpFormSchema = z.object({
    name: z.string().trim().min(3).max(32),
    email: z.string().email(),
    password: z.string().min(6).max(32)
})