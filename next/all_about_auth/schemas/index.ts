import * as z from 'zod'

export const LoginSchema = z.object({
    email: z.string().email({
        message: 'Email is required',
    }),
    password: z.string().min(1, 'Password is required'),
    code: z.optional(z.string()),
})


export const RegisterSchema = z.object({
    username: z.string().min(3, 'Username must be at least 3 characters long'),
    email: z.string().email({
        message: 'Email is required',
    }),
    password: z.string().min(6, "Password must be at least 6 characters!")
})


export const resetSchema = z.object({
    email: z.string().email({message: 'Email is required'}).email({message: 'Enter a valid email address'}),
})

export const newPasswordSchema = z.object({
    password: z.string().min(6, 'Password must be at least 6 characters long'),
})