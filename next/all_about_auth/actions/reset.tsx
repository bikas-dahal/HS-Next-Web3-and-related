'use server'

import * as z from 'zod'
import {resetSchema} from "@/schemas";
import {getUserByEmail} from "@/data/user";
import {getPasswordResetToken} from "@/data/password-reset-token";
import {sendPasswordResetEmail} from "@/lib/mail";
import {generatePasswordResetToken} from "@/lib/tokens";

export const reset = async (values: z.infer<typeof resetSchema>) => {
    const validatedMail = resetSchema.safeParse(values)

    if (!validatedMail) {
        return {
            error: 'Invalid email address',
        }
    }

    const { email } = validatedMail.data

    const existingUser = await getUserByEmail(email)

    if (!existingUser) {
        return {
            error: 'Email not found',
        }
    }

    const passwordResetToken = await generatePasswordResetToken(email)
    await sendPasswordResetEmail(
        passwordResetToken.email,
        passwordResetToken.token
    )

    return {
        success: 'Password reset mail is sent successfully',
    }
}