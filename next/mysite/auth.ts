// import NextAuth, {AuthError, CredentialsSignin} from "next-auth"
// import Google from "next-auth/providers/google"
// import credentialProvider from "next-auth/providers/credentials";
// import {User} from "@/models/userModel"; //
// import {compare} from 'bcryptjs'
// import {dbConnect} from "@/lib/utils"; //
// import { createUser, findUserByEmail, findUserById } from '@/models/user';
//
// export const { auth, handlers, signIn, signOut } = NextAuth({
//     providers: [
//         Google({
//             clientId: process.env.GOOGLE_CLIENT_ID,
//             clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//         }),
//         credentialProvider({
//             name: 'Credentials',
//             credentials: {
//                 email: {
//                     label: 'Email',
//                     type: 'email'
//                 },
//                 password: {
//                     label: 'Password',
//                     type: 'password',
//                 }
//             },
//             authorize: async (credentials) => {
//                 const email = credentials.email as string | undefined;
//                 const password = credentials.password as string | undefined;
//
//                 if (!email || !password) {
//                     throw new CredentialsSignin({
//                         cause: 'Please provide all required credentials.',
//                     })
//                 }
//
//                 // Connection to db
//                 await dbConnect()
//
//                 const user = await findUserByEmail(email)
//
//                 if (!user) {
//                     throw new CredentialsSignin({
//                         cause: 'Email or password is not correct.',
//                     });
//                 }
//
//                 const isMatch = await compare(password, user.password)
//
//                 if (!isMatch) {
//                     throw new CredentialsSignin({
//                         cause: 'Email or password is not correct.'
//                     })
//                 }
//
//                 return {
//                     name: user.name,
//                     email: user.email,
//                     id: user.id,
//                     image: user.image,
//                 }
//             }
//         })
//     ],
//     pages: {
//         signIn: '/login'
//     },
//     callbacks: {
//         signIn: async ({user, account}) => {
//             if (account?.provider === 'credentials') return true;
//
//             if (account?.provider === 'google') {
//                 const existingUser = await findUserByEmail(user.email);
//
//                 if (!existingUser) {
//                     await createUser({
//                         name: user.name!,
//                         email: user.email!,
//                         googleId: account.id,
//                         image: user.image!,
//                     });
//                 }
//
//                 return true;
//             }
//             return false;
//         },
//     }
// })