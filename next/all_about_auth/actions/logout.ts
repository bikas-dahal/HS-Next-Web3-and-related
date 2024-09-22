'use server'

import { signOut} from "@/auth";

export const logOut = async () => {
    // some server stuff
    await signOut();
}