'use server'

import {Account, Client, Databases, Query} from "node-appwrite";
import {cookies} from "next/headers";
import {AUTH_COOKIE} from "@/features/auth/constants";
import { DATABASE_ID, MEMBERS_ID, WORKSPACES_ID } from "@/config";
import { getMembers } from "../members/utils";
import { Workspace } from "@/schemas/types";

export const getWorkspaces = async () => {
    try {
        const client = new Client()
            .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
            .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!)

        const session = cookies().get(AUTH_COOKIE)

        if (!session) return ({
            document: [],
            total: 0
    })

        // client.setJWT(session.value);
        console.log('session', session)
        client.setSession(session.value)

        const databases = new Databases(client)
        const account = new Account(client)
        const user = await account.get()

        // console.log('hi', account)

        const members = await databases.listDocuments(
            DATABASE_ID,
            MEMBERS_ID,
            [Query.equal('userId', user.$id)]
        )

        if (members.total === 0) {
            return ({
                    document: [],
                    total: 0
            })
        }

        const workspaceIds = members.documents.map((member) => member.workspaceId)

        const workspaces = await databases.listDocuments(
            DATABASE_ID,
            WORKSPACES_ID,
           [
                Query.orderDesc('$createdAt'),  
                Query.contains('$id', workspaceIds)
            ] 
        )

        return workspaces
    } catch (error) {
        console.log(error)
        return ({
            document: [],
            total: 0
    })
    }
}


export const getWorkspace = async ({ workspaceId }: {workspaceId: string}) => {
    try {
        const client = new Client()
            .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
            .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!)

        const session = cookies().get(AUTH_COOKIE)

        if (!session) return null 

        // client.setJWT(session.value);
        // console.log('session', session)
        client.setSession(session.value)

        const databases = new Databases(client)
        const account = new Account(client)
        const user = await account.get()

        // console.log('hi', account)

        const member = await getMembers({
            databases,
            workspaceId,
            userId: user.$id,
        })

        if (!member) return null


        // if (members.total === 0) {
        //     return ({
        //             document: [],
        //             total: 0
        //     })
        // }

        // const workspaceIds = members.documents.map((member) => member.workspaceId)

        const workspace = await databases.getDocument<Workspace>(
            DATABASE_ID,
            WORKSPACES_ID,
            workspaceId
        )

        return workspace
    } catch (error) {
        console.log(error)
        return null
    }
}
