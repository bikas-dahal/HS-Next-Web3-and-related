import {db} from '@/lib/db'


export const getPasswordResetToken = async (token: string) => {
    try {
        return await db.passwordResetToken.findUnique({
            where: {
                token
            }
        })
    } catch (e) {
        console.log(e)
        return null
    }
}

export const getPasswordResetTokenByEmail = async (email: string) => {
    try {
        const token =  await db.passwordResetToken.findFirst({
            where: {
                email
            }
        })
        return token
    } catch (e) {
        console.log(e)
        return null
    }
}