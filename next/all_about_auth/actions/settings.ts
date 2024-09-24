'use server'

import * as z from 'zod'
import {SettingSchema} from "@/schemas";
import {currentUser} from "@/lib/auth";
import {getUserById} from "@/data/user";
import { db } from "@/lib/db";

export const settings = async (
    values: z.infer<typeof SettingSchema>
) => {
    const user = await currentUser()

    if (!user) {
        return {
            error: 'No Authorized User',
        }
    }

    const dbUser = await getUserById(user.id!)
    if (!dbUser) {
        return {
            error: 'User not found',
        }
    }

    await db.user.update({
        where: {id: dbUser.id},
        data: {
            ...values,
        }

    })

    return {
        success: 'Settings updated successfully',
    }
}