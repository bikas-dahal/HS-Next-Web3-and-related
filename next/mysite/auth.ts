import NextAuth, {AuthError, CredentialsSignin} from "next-auth"
import Google from "next-auth/providers/google"
import credentialProvider from "next-auth/providers/credentials";
import {type} from "node:os";
import {User} from "@/models/userModel";
import {compare} from 'bcryptjs'
import {dbConnect} from "@/lib/utils";

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

                // Connection to db
                await dbConnect()

                const user = await User.findOne({email}).select('+password')

                if (!user) {
                    throw new CredentialsSignin({
                        cause: 'Please provide all required credentials.',
                    })
                }

                if (!password) {
                    throw new CredentialsSignin({
                        cause: 'Please provide all required credentials.',
                    })
                }

                const isMatch = await compare(password, user.password)

                if (!isMatch) {
                    throw new CredentialsSignin({
                        cause: 'Email or password is not correct.'
                    })
                }

                return {
                    name: user.name,
                    email: user.email,
                    id: user._id
                }
            }
        })
    ],
    pages: {
        signIn: '/login'
    },
    callbacks: {
        signIn: async ({ user, account }) => {
            if ( account?.provider === 'credentials') return true
            if (account?.provider === 'google'){
                try {
                    const { email, name, image, id} = user
                    await dbConnect()

                    const userExists = await User.findOne({email})

                    if (!userExists) {
                        await User.create({email, name, image, googleId: id})
                    }

                    return true
                } catch (e) {
                    throw new AuthError('Error while creating a user.')
                }
            } {
                return false
            }
        }
    }
})