import * as z from 'zod'
import {UserRole} from "@prisma/client";

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

export const SettingSchema = z.object({
    name: z.optional(z.string()),
    isTwoFactorEnabled: z.optional(z.boolean()),
    role: z.enum([UserRole.USER, UserRole.ADMIN]),
    email: z.optional(z.string().email()),
    password: z.optional(z.string().min(6, 'Password must be at least 6 characters!')),
    newPassword: z.optional(z.string().min(6, 'Password must be at least 6 characters!')),
})
    .refine((data) => {
        if (!data.password && data.newPassword) {
            return false
        }

        return true
    }, {
        message: 'Password is required',
        path: ['password'],
    })
    .refine((data) => {
        return !(!data.newPassword && data.password);
    }, {
        message: 'New Password is required',
        path: ['newPassword'],
    })

