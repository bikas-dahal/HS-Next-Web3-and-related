'use server'

import * as z from 'zod'
import { RegisterSchema } from "@/schemas";
import bcrypt from 'bcrypt'
import { db } from '@/lib/db'
import { getUserByEmail } from "@/data/user";


export const register = async (values: z.infer<typeof RegisterSchema>) => {

    const validatedFields = RegisterSchema.safeParse(values)

    if (!validatedFields) {
        return {
            error: 'Invalid login credentials'
        }
    }

    const { username, email, password } = validatedFields.data

    const hashedPassword = await bcrypt.hash(password, 10)

    const existingUser = await getUserByEmail(email)

    console.log(existingUser)

    if (existingUser) {
        return {
            error: 'Email already in use!',
        }
    }

    await db.user.create({
        data: {
            username,
            email,
            password: hashedPassword
        },
    })

    //Verification token email todo


    return {
        success: 'Email sent'
    }
}