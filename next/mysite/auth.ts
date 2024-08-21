import NextAuth, {CredentialsSignin} from "next-auth"
import Google from "next-auth/providers/google"
import credentialProvider from "next-auth/providers/credentials";
import {type} from "node:os";
import {User} from "@/models/userModel";
import {compare} from 'bcryptjs'

export const { auth, handlers, signIn, signOut } = NextAuth({
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        credentialProvider({
            name: 'Credentials',
            credentials: {
                email: {
                    label: 'Email',
                    type: 'email'
                },
                password: {
                    label: 'Password',
                    type: 'password',
                }
            },
            authorize: async (credentials) => {
                const email = credentials.email as string | undefined;
                const password = credentials.password as string | undefined;

                if (!email || !password) {
                    throw new CredentialsSignin({
                        cause: 'Please provide all required credentials.',
                    })
                }

                const user = await User.findOne({email}).select('+password')

                if (!user) {
                    throw new CredentialsSignin('Invalid email or password')
                }

                if (!password) {
                    throw new CredentialsSignin('Invalid email or password.')
                }

                const isMatch = await compare(password, user.password)

                if (!isMatch) {
                    throw new CredentialsSignin('Invalid password')
                }

                return {
                    name: user.name,
                    email: user.email,
                    id: user._id
                }
            }
        })
    ],
})