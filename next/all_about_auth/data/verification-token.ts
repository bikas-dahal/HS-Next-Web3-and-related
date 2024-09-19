import {db} from '@/lib/db'

export const getVerificationTokenByToken = async (token: string) => {
    try {
        return await db.verificationToken.findUnique({
            where: {
                token
            }
        })

    } catch (e) {
        console.log(e)
        return null
    }
}

export const getVerificationTokenByEmail = async (email: string) => {
    try {
        return await db.verificationToken.findFirst({
            where: {
                email
            }
        })

    } catch (e) {
        console.log(e)
        return null
    }
}