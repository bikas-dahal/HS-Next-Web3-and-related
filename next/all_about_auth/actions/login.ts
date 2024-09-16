'use server'

import * as z from 'zod'
import { LoginSchema } from "@/schemas";


export const login = async (values: z.infer<typeof LoginSchema>) => {

    const validatedFields = LoginSchema.safeParse(values)

    if (!validatedFields) {
        return {
            error: 'Invalid login credentials'
        }
    }

    return {
        success: 'Email sent'
    }

    console.log(values)
}