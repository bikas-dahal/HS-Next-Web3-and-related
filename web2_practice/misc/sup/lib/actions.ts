'use server'

import {auth} from "@/auth";
import {parseServerActionResponse} from "@/lib/utils";

export const createPitch = async (state: any, form: FormData, pitch: string) => {
    const session = await auth()

    if (!session) {
        return parseServerActionResponse({
            error: 'Not signed in',
            status: 'ERROR'
        })
    }

}