'use server'

import {auth} from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import {revalidatePath} from "next/cache";

export async function deleteWorkflow(workflowId: string) {
    const { userId } = auth()

    if (!userId) {
        throw new Error('Please authenticate first 👁️')
    }

    await prisma.workflow.delete({
        where: {
            id: workflowId,
            userId
        }
    })

    revalidatePath('/workflows')
}