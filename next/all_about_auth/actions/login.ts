'use server'

import * as z from 'zod'
import { LoginSchema } from "@/schemas";
import {signIn} from "@/auth";
import {AuthError} from "next-auth";
import {DEFAULT_LOGIN_REDIRECT} from "@/routes";
import {getUserByEmail} from "@/data/user";
import {generateVerificationToken} from "@/lib/tokens";
import {sendVerificationEmail} from "@/lib/mail";


export const login = async (values: z.infer<typeof LoginSchema>) => {

    const validatedFields = LoginSchema.safeParse(values)

    if (!validatedFields) {
        return {
            error: 'Invalid login credentials'
        }
    }

    const { email, password } = validatedFields.data

    const existingUser = await getUserByEmail(email)

    if (!existingUser) {
        return {
            error: 'Invalid login credentials'
        }
    }

    if (!existingUser.emailVerified) {
        const verificationToken = await generateVerificationToken(existingUser.email)

        console.log(verificationToken)

        await sendVerificationEmail(
            verificationToken.email,
            verificationToken.token,
        )

        return {
            success: 'Confirmation email sent!'
        }
    }

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