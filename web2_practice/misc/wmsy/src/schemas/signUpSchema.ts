import {z} from "zod";

export const signUpFormSchema = z.object({
    name: z.string().trim().min(3).max(32),
    email: z.string().email(),
    password: z.string().min(8).max(32)
})

export type signUpType = z.infer<typeof signUpFormSchema>