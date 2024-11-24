import { createSessionClient } from "@/lib/appwrite"
import { getMembers } from "@/features/members/utils"
import { Project } from "@/schemas/types"
import { DATABASE_ID, PROJECTS_ID, WORKSPACES_ID } from "@/config"

export const getProject = async ({ projectId }: {projectId: string}) => {
    // throw new Error('Not implemented')
    
        const { databases, account } = await createSessionClient()
        
        const project = await databases.getDocument<Project>(
            DATABASE_ID,
            PROJECTS_ID,
            projectId
        )

        const user = await account.get()

        const member = await getMembers({
            databases,
            workspaceId: project.workspaceId,
            userId: user.$id,
        })

        if (!member) {
            throw new Error('You are not a member of this project')
        }

        return project
}
