'use server'

import {Account, Client} from "node-appwrite";
import {cookies} from "next/headers";
import {AUTH_COOKIE} from "@/features/auth/constants";
import { createSessionClient } from "@/lib/appwrite";

export const getCurrent = async () => {
    try {
        const { account } = await createSessionClient()

        // console.log('hi', account)

        return await account.get()
    } catch (error) {
        console.log(error)
        return null
    }
}
