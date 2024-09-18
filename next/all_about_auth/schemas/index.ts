import * as z from 'zod'

export const LoginSchema = z.object({
    email: z.string().email({
        message: 'Email is required',
    }),
    password: z.string().min(1, 'Password is required'),
})


export const RegisterSchema = z.object({
    username: z.string().min(3, 'Username must be at least 3 characters long'),
    email: z.string().email({
        message: 'Email is required',
    }),
    password: z.string().min(6, "Password must be at least 6 characters!")
})