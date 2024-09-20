'use server'

import * as z from 'zod'
import { newPasswordSchema} from "@/schemas";
import {getPasswordResetToken} from "@/data/password-reset-token";
import {getUserByEmail} from "@/data/user";
import bcrypt from "bcryptjs";
import {db} from '@/lib/db'

export const newPassword = async (values: z.infer<typeof newPasswordSchema>, token: string) =>{
    if (!token) {
        return {
            error: 'No token provided',
        }
    }

    const validatedFields = newPasswordSchema.safeParse(values)
    if (!validatedFields) {
        return {
            error: 'Invalid credentials'
        }
    }

    const { password } = validatedFields.data

    const existingToken = await getPasswordResetToken(token)
    if (!existingToken) {
        return {
            error: 'Invalid token',
        }
    }

    const hasExpired = new Date(existingToken.expires) < new Date()
    if (hasExpired) {
        return {
            error: 'Token has expired',
        }
    }

    const existingUser = await getUserByEmail(existingToken.email)
    if (!existingUser) {
        return {
            error: 'Invalid email provided',
        }
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    await db.user.update({
        where: {id: existingUser.id},
        data: {
            password: hashedPassword,
        }
    })

    await db.passwordResetToken.delete({
        where: {id: existingToken.id},
    })

    return {
        success: 'Your password has been changed successfully',
    }

}