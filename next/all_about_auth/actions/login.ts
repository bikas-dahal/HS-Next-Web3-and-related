'use server'

import * as z from 'zod'
import { LoginSchema } from "@/schemas";
import {signIn} from "@/auth";
import {AuthError} from "next-auth";
import {DEFAULT_LOGIN_REDIRECT} from "@/routes";


export const login = async (values: z.infer<typeof LoginSchema>) => {

    const validatedFields = LoginSchema.safeParse(values)

    if (!validatedFields) {
        return {
            error: 'Invalid login credentials'
        }
    }

    const { email, password } = validatedFields.data

    try {
        await signIn('credentials', {
            email,
            password,
            redirectTo: DEFAULT_LOGIN_REDIRECT
        })

        return {
            success: 'Login successful',
        }
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return {
                        error: 'Invalid credentials'
                    }
                    default:
                        return { error: 'Something went wrong' }
            }
        }

        throw error;
    }
}