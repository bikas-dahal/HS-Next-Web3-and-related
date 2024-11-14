import {NextAuthConfig} from "next-auth";
import Credentials from "@auth/core/providers/credentials";
import {loginSchema} from "@/schema/LoginSchema";
import {compare} from "bcryptjs";
import {getUserByEmail} from "@/actions/authAction";

export default {
    providers: [Credentials({
        name: "credentials",
        async authorize(data) {
            const validated = loginSchema.safeParse(data)

            if (validated.success) {
                const { email, password } = validated.data

                const user = await getUserByEmail(email)

                if (!user || !(await compare(password, user.password))) { return null }

                return user
            }

            return null

        }
    })]
} satisfies NextAuthConfig