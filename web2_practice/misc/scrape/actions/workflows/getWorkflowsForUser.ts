'use server'

import {auth} from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

export async function GetWorkflowsForUser() {
    const { userId } = auth()

    if (!userId) {
        throw new Error('Not authorized')
    }

    return prisma.workflow.findMany({
        where: {
            userId
        },
        orderBy: {
            createdAt: 'asc'
        }
    })

}