'use server'

import {signIn} from "@/auth";
import {CredentialsSignin} from "next-auth";

const credentialsLogin = async ( email: string, password: string) => {

    try {
        await signIn('credentials', {
            email,
            password,
            redirect: true,
            redirectTo: '/'
        })
    } catch (e) {
        const err = e as CredentialsSignin;
        return err.cause
    }
}

export { credentialsLogin }