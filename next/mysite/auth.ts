// import NextAuth, {AuthError, CredentialsSignin} from "next-auth"
// import Google from "next-auth/providers/google"
// import credentialProvider from "next-auth/providers/credentials";
// import User from "@/models/userModel"; //
// import bcrypt from 'bcryptjs'
// // import { createUser, findUserByEmail, findUserById } from '@/models/user';
// import dbConnect from "@/lib/dbConnect";
//
// class InvalidLoginError extends CredentialsSignin {
//     code = "Invalid identifier or password"
// }
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
//             authorize: async (credentials)=> {
//                 const username = credentials.email as string | undefined;
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
//                 try {
//                     const user = await User.findOne({
//                         $or: [
//                             {email},
//                             {username}
//                         ]
//                     })
//                     if (!user) {
//                         throw new CredentialsSignin({
//                             cause: 'Invalid credentials.',
//                         })
//                     }
//
//                     if(!user.isVerified) {
//                         throw new CredentialsSignin({
//                             cause: 'Please verify your email address',
//                         })
//                     }
//
//                     const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password)
//
//                     if (isPasswordCorrect) {
//                         return user
//                     } else {
//                         throw new CredentialsSignin({
//                             cause: 'Invalid credentials.',
//                         })
//                     }
//
//                 } catch (err) {
//                     throw new CredentialsSignin({
//                         cause: 'Internal server error.',
//                     })
//                 }
//         //         const user = await User.findOne({email: email})
//         //
//         //         // const user = await findUserByEmail(email)
//         //
//         //         if (!user) {
//         //             throw new CredentialsSignin({
//         //                 cause: 'Email or password is not correct.',
//         //             });
//         //         }
//         //
//         //         const isMatch = await compare(password, user.password)
//         //
//         //         if (!isMatch) {
//         //             throw new CredentialsSignin({
//         //                 cause: 'Email or password is not correct.'
//         //             })
//         //         }
//         //
//         //         return {
//         //             name: user.name,
//         //             email: user.email,
//         //             id: user.id,
//         //             image: user.image,
//         //         }
//             }
//         })
//     ],
//     pages: {
//         signIn: '/login',
//
//     },
//     session: {
//         strategy: 'jwt'
//     },
//     secret: process.env.AUTH_SECRET,
//     callbacks: {
//         async jwt({ token, user}) {
//             if (user) {
//                 token._id = user._id?.toString()
//                 token.isVerified = user.isVerified;
//                 token.isAcceptingMessages = user.isAcceptingMessages
//                 token.username = user.username;
//             }
//             return token
//         },
//         async session({ session, token}) {
//             if (token) {
//                 session.user._id = token._id;
//                 session.user.isVerified = token.isVerified
//                 session.user.isAcceptingMessages = token.isAcceptingMessages
//                 session.user.username = token.username
//             }
//             return session
//         },
//         signIn: async ({user, account}) => {
//             if (account?.provider === 'credentials') return true;
//
//             if (account?.provider === 'google') {
//                 const existingUser = await User.findOne({ email: user.email})
//                 // const existingUser = await findUserByEmail(user.email);
//
//                 if (!existingUser) {
//                     await User.create({
//                         email: user.email,
//                         name: user.name,
//                         googleId: account.id,
//                         image: user.image,
//                     })
//                 }
//
//                 // if (!existingUser) {
//                 //     await createUser({
//                 //         name: user.name!,
//                 //         email: user.email!,
//                 //         googleId: account.id,
//                 //         image: user.image!,
//                 //     });
//                 // }
//
//                 return true;
//             }
//             return false;
//         },
//     }
// })