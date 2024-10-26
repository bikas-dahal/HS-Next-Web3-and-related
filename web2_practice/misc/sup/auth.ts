import NextAuth from "next-auth"
import GitHub from "@auth/core/providers/github";

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [GitHub],
})