'use server'

import * as z from 'zod'
import {LoginSchema} from "@/schemas";
import {signIn} from "@/auth";
import {AuthError} from "next-auth";
import {DEFAULT_LOGIN_REDIRECT} from "@/routes";
import {getUserByEmail} from "@/data/user";
import {generateTwoFactorToken, generateVerificationToken} from "@/lib/tokens";
import {sendTwoFactorTokenEmail, sendVerificationEmail} from "@/lib/mail";
import {getTwoFactorTokenByEmail} from "@/data/two-factor-token";
import { db } from "@/lib/db";
import {getTwoFactorConfirmationByUserId} from "@/data/two-factor-confirmation";


export const login = async (
    values: z.infer<typeof LoginSchema>,
    callbackUrl?: string
) => {

    const validatedFields = LoginSchema.safeParse(values)

    if (!validatedFields.success) {
        return {
            error: 'Invalid login credentials'
        }
    }

    const {email, password, code} = validatedFields.data

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

    if (existingUser.isTwoFactorEnabled && existingUser.email) {

        if (code) {
            const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email)

            if (!twoFactorToken) {
                return {
                    error: 'Invalid codeee'
                }
            }
            console.log(code)
            console.log(twoFactorToken)

            if (twoFactorToken.token !== code) {
                return {
                    error: 'Invalid code!'
                }
            }

            const hasExpired = new Date(twoFactorToken.expires) < new Date()
            if (hasExpired) {
                return {
                    error: "Token has expired"
                }
            }

            await db.twoFactorToken.delete({
                where: {
                    id: twoFactorToken.id
                }
            })

            const existingConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id)

            if (existingConfirmation) {
                await db.twoFactorConfirmation.delete({
                    where: {
                        id: existingConfirmation.id
                    }
                })
            }

            await db.twoFactorConfirmation.create({
                data: {
                    userId: existingUser.id,
                }
            })

            console.log('pass')


        } else {
            const twoFactorToken = await generateTwoFactorToken(existingUser.email)
            console.log(twoFactorToken)
            await sendTwoFactorTokenEmail(
                twoFactorToken.email,
                twoFactorToken.token
            )

            return {
                twoFactor: true
            }
        }
    }

    try {
        await signIn('credentials', {
            email,
            password,
            redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT
        })

        return {
            success: 'Login successful',
        }
    } catch (error) {

        console.log('error', error);
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return {
                        error: 'Invalid credentials'
                    }
                default:


                    return {error: 'Something went wrong'}
            }
        }

        throw error;
    }
}