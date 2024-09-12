import { z } from "zod";

export const usernameValidation = z
    .string()
    .min(2, 'Must be at least 3 characters long')
    .max(30, 'Must be less than 30 characters')

export const signUpSchema = z.object({
    username: usernameValidation,
    email: z.string().email({message: 'Email is required'}).email({message: 'Enter a valid email address'}),
    password: z.string().min(6, 'Must be at least 6 characters long')
})


export const signInSchema = z.object({
    email: z.string().email({message: 'Email is required'}).email({message: 'Enter a valid email address'}),
    password: z.string()
})


export const verifySchema = z.object({
    code: z.string().length(6, 'Must be at least 6 characters long'),
})


export const acceptMessageSchema = z.object({
    acceptMessages: z.boolean()
})

export const messageSchema = z.object({
    content: z.string()
        .min(10, {message: 'Content with at least 10 character is required'})
        .max(200, 'Must be less than 200 characters long')
})

