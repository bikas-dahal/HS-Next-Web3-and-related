import {type DefaultSession} from "next-auth";
import { JWT} from "@auth/core/jwt";
import {UserRole} from "@prisma/client";

export type ExtendedUser = DefaultSession['user'] & {
    role: UserRole
    password: string
    isTwoFactorEnabled: boolean;
    isOAuth: boolean;

}

declare module 'next-auth' {
    interface Session {
        user: ExtendedUser;
        isTwoFactorEnabled: boolean;

        email: string;
    }
}

declare module '@auth/core/jwt' {
    interface JWT {
        role?: 'ADMIN' | 'USER';

    }
}

