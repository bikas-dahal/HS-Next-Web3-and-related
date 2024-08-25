import { z } from "zod"

export const registerSchema = z.object({
    name: z.string({message: 'Name is required'}).min(3, {message: 'Minimum 3 characters'}),
    email: z.string({message: 'Email is required'}).email({message: 'Email is required'}),
    password: z.string({message: 'Password is required'}).min(6, {message: 'Minimum 6 characters'}),
    confirm_password: z.string({message: 'Password is required'}).min(6, {message: 'Confirm password'}),
}).refine((data) => data && data.password === data.confirm_password, {
    message: "Password doesn't match", path:['confirm_password']
})