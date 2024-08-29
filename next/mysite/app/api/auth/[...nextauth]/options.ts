import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConnect";
import {NextAuthOptions} from "next-auth";


export const authOptions:NextAuthOptions = ({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials: any, req): Promise<any> {
                const { email, password } = credentials;

                if (!email || !password) {
                    throw new Error("Please provide all required credentials.");
                }

                await dbConnect();

                try {
                    const user = await User.findOne({ email });
                    if (!user) {
                        throw new Error("Invalid credentials.");
                    }

                    if (!user.isVerified) {
                        throw new Error("Please verify your email address.");
                    }

                    const isPasswordCorrect = await bcrypt.compare(password, user.password);
                    if (!isPasswordCorrect) {
                        throw new Error("Invalid credentials.");
                    }

                    return user;
                } catch (err) {
                    throw new Error('Error occurred',)
                }

            },
        }),
    ],
    pages: {
        signIn: "/login",
    },
    session: {
        strategy: "jwt",
    },
    secret: process.env.AUTH_SECRET,
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token._id = user._id?.toString();
                token.isVerified = user.isVerified;
                token.isAcceptingMessages = user.isAcceptingMessages;
                token.username = user.username;
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user._id = token._id;
                session.user.isVerified = token.isVerified;
                session.user.isAcceptingMessages = token.isAcceptingMessages;
                session.user.username = token.username;
            }
            return session;
        },
        async signIn({ user, account }) {
            if (account?.provider === "credentials") return true;

            if (account?.provider === "google") {
                const existingUser = await User.findOne({ email: user.email });
                if (!existingUser) {
                    await User.create({
                        email: user.email,
                        name: user.name,
                        googleId: account.id,
                        image: user.image,
                    });
                }

                return true;
            }
            return false;
        },
    },
});

