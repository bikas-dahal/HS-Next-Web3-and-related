'use server'

import {Account, Client, Databases, Query} from "node-appwrite";
import {cookies} from "next/headers";
import {AUTH_COOKIE} from "@/features/auth/constants";
import { DATABASE_ID, MEMBERS_ID, WORKSPACES_ID } from "@/config";
import { getMembers } from "../members/utils";
import { Workspace } from "@/schemas/types";
import { createSessionClient } from "@/lib/appwrite";

export const getWorkspaces = async () => {
    try {
        const { databases, account } = await createSessionClient()
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
   
        const { databases, account } = await createSessionClient()

        const user = await account.get()

        const member = await getMembers({
            databases,
            workspaceId,
            userId: user.$id,
        })

        if (!member) {
            throw new Error('You are not a member of this workspace')
        }

        const workspace = await databases.getDocument<Workspace>(
            DATABASE_ID,
            WORKSPACES_ID,
            workspaceId
        )


        return workspace
}


export const getWorkspaceInfo = async ({ workspaceId }: {workspaceId: string}) => {
 
        const { databases } = await createSessionClient()

        const workspace = await databases.getDocument<Workspace>(
            DATABASE_ID,
            WORKSPACES_ID,
            workspaceId
        )

        return {
            name: workspace.name 
        }
    
}
