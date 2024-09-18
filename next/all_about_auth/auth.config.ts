import GitHub from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";

import {LoginSchema} from "@/schemas";

import type { NextAuthConfig } from "next-auth";
import {getUserByEmail} from "@/data/user";
import bcrypt from "bcryptjs";

export default {
    providers: [
        GitHub({
            // clientId: process.env.GITHUB_CLIENT_ID!,
            // clientSecret: process.env.GITHUB_CLIENT_SECRET!,
        }),
        Credentials({
            async authorize(credentials) {
                const validatedData = LoginSchema.safeParse(credentials);

                if (validatedData.success) {
                    const { email, password } = validatedData.data
                    const user = await getUserByEmail(email)

                    if (!user || !user.password) {
                        return null
                    }

                    const passwordMatch = await bcrypt.compare(password, user.password);

                    if (passwordMatch) return user
                }

                return null

            }
        })
    ],

} satisfies NextAuthConfig