import {z} from "zod";

export const signInFormSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6, {message: 'Password must be at least 6 characters long'}).max(32)
})

export type signInType = z.infer<typeof signInFormSchema>