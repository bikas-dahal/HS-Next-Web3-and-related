import NextAuth from "next-auth"
import GitHub from "@auth/core/providers/github";
import Google from "next-auth/providers/google"
import {client} from "@/sanity/lib/client";
import {AUTHOR_BY_GITHUB_ID_QUERY} from "@/sanity/lib/queries";
import {writeClient} from "@/sanity/lib/write-client";

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [GitHub, Google],
    callbacks: {
        async signIn({ user, profile, account }) {
            const id = account?.provider === "github" ? profile?.id : profile?.sub;
            // console.log(id);
            // console.log('profile', profile);
            
            
            // async signIn({ user: {name, email, image}, profile: { id, login, bio} }) {
            const existingUser = await client.withConfig({ useCdn: false }).fetch(AUTHOR_BY_GITHUB_ID_QUERY, { id: profile?.id })
            console.log('eeeeeeeee', existingUser)
            if (!existingUser) {
                await writeClient.create({
                    _type: 'author',
                    id: profile?.id,
                    name: user?.name,
                    username: profile?.login,
                    email: user?.email,
                    image: user?.image,
                    bio: profile?.bio || '',
                })
            }
            return true
        },
        async jwt({ token, profile, account }) {
            if (account && profile) {
                const user = await client.withConfig({ useCdn: false}).fetch(AUTHOR_BY_GITHUB_ID_QUERY, { id: profile?.id })

                token.id = user?._id
            }

            return token
        },
        async session({ session, token }) {
            Object.assign(session, { id: token.id })
            return session
        }
    }
})