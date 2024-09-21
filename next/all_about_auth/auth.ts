import NextAuth from "next-auth";
// import GitHub from "next-auth/providers/github";
import {PrismaAdapter} from "@auth/prisma-adapter";
import { db } from '@/lib/db'

import authConfig from "@/auth.config";
import {getUserById} from "@/data/user";
import {User} from "lucide-react";
import {getUserByEmail} from "@/data/user";
import {getTwoFactorConfirmationByUserId} from "@/data/two-factor-confirmation";
// import {UserRole} from "@prisma/client";

// declare module "@auth/core" {
//     interface Session {
//         user: {
//             role: string
//         } & DefaultSession['user']
//     }
// }

export const {
    handlers: { GET, POST },
    auth,
    signOut,
    signIn,
} = NextAuth({
    pages: {
        signIn: '/auth/login',
        error: 'auth/error',

    },
    events: {
        async linkAccount({ user }) {
            await db.user.update({
                where: {
                    id: user.id,
                }, data: {
                    emailVerified: new Date()
                }
            })
        }
    },
    callbacks: {

        async signIn({ user, account}) {

            if (account?.provider !== "credentials") return true;


            const existingUser = await getUserById( user.id! );

            if (!existingUser?.email_verified) {
                return false
            }

            if (existingUser.isTwoFactorEnabled) {
                const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id)

                if (!twoFactorConfirmation) return false;

                await db.twoFactorConfirmation.delete({
                    where: {
                        id: twoFactorConfirmation.id
                    }
                })
            }

            console.log('check')

            return true

        },

        async session({ token, session}) {
            console.log({stoken: token})
            console.log("session", session)

            if (session.user && token.sub) {
                session.user.id = token.sub
            }

            if (token.role && session.user) {
                session.user.role = token.role
            }

            return session
        },
        async jwt({ token }) {

            if (!token.sub) return token

            const existingUser = await getUserById(token.sub)
            if (!existingUser) return token

            token.role = existingUser.role

            return token
        }
    },
    adapter: PrismaAdapter(db),
    session: {
        strategy: "jwt"
    },
    ...authConfig
})
