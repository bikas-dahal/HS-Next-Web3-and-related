import { Workspace } from '@/schemas/types';
import { DATABASE_ID, IMAGES_BUCKET_ID, MEMBERS_ID, WORKSPACES_ID } from "@/config";
import { sessionMiddleware } from "@/lib/session-middleware";
import { generateInviteCode } from "@/lib/utils";
import { createWorkspaceSchema, updateWorkspaceSchema } from "@/schemas/workspaceSchema";
import { MemberRole } from "@/schemas/memberTypes";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { ID, Query } from "node-appwrite";
import { getMembers } from "@/features/members/utils";
import { z } from "zod";

const app = new Hono()
    .get('/', sessionMiddleware,async (c) => {
        const databases = c.get('databases')
        const user = c.get('user')

        const members = await databases.listDocuments(
            DATABASE_ID,
            MEMBERS_ID,
            [Query.equal('userId', user.$id)]
        )

        // if (members.total === 0) {
        //     return c.json({
        //         data: {
        //             document: [],
        //             total: 0
        //         }
        //     })
        // }

        const workspaceIds = members.documents.map((member) => member.workspaceId)

        const workspaces = await databases.listDocuments(
            DATABASE_ID,
            WORKSPACES_ID,
           [
                Query.orderDesc('$createdAt'),  
                Query.contains('$id', workspaceIds)
            ] 
        )

        return c.json({
            data: workspaces
        })
    })
    .get(
        '/:workspaceId',
        sessionMiddleware,
        async (c) => {
            const databases = c.get('databases')
            const user = c.get('user')

            const { workspaceId } = c.req.param()

            const member = await getMembers({ databases, workspaceId, userId: user.$id })

            if (!member) {
                return c.json({ error: 'You are not a member of this workspace' }, 401)
            }

            const workspace = await databases.getDocument<Workspace>(DATABASE_ID, WORKSPACES_ID, workspaceId)

            return c.json({ 
                data: workspace
            })
    })
    .get(
        '/:workspaceId/info',
        sessionMiddleware,
        async (c) => {
            const databases = c.get('databases')

            const { workspaceId } = c.req.param()

            const workspace = await databases.getDocument<Workspace>(DATABASE_ID, WORKSPACES_ID, workspaceId)

            return c.json({ 
                data: {
                    $id: workspace.$id,
                    name: workspace.name,
                    image: workspace.image,
                    code: workspace.inviteCode
                }
            })
    })

    .post(
        '/',
        zValidator('form', createWorkspaceSchema),
        sessionMiddleware,
        async (c) =>{
            const databases = c.get('databases')
            const user = c.get('user')
            const storage = c.get('storage')

            const { name, image } = c.req.valid('form')

            let uploadedImageUrl: string | undefined

            if (image instanceof File) {
                const file = await storage.createFile(
                    IMAGES_BUCKET_ID,
                    ID.unique(),
                    image
                )
                
                const arrayBuffer = await storage.getFilePreview(
                    IMAGES_BUCKET_ID,
                    file.$id
                )

                uploadedImageUrl = `data:image/png;base64,${Buffer.from(arrayBuffer).toString('base64')}`

            } 

            const workspace = await databases.createDocument(
                DATABASE_ID,
                WORKSPACES_ID,
                ID.unique(),
                {
                    name,
                    userId: user.$id,
                    image: uploadedImageUrl,
                    inviteCode: generateInviteCode(6)
                }
            )

            await databases.createDocument(
                DATABASE_ID,
                MEMBERS_ID,
                ID.unique(),
                {
                    userId: user.$id,
                    workspaceId: workspace.$id,
                    role: MemberRole.ADMIN
                }
            )

            return c.json({ data: workspace})
        }
    )
    .patch(
        '/:workspaceId',
        sessionMiddleware,
        zValidator('form', updateWorkspaceSchema),
        async (c) => {
            const databases = c.get('databases')
            const storage = c.get('storage')
            const user = c.get('user')

            const { workspaceId } = c.req.param()
            const { name, image } = c.req.valid('form')

            const member = await getMembers({ databases, workspaceId, userId: user.$id })

            if (!member || member.role !== MemberRole.ADMIN) {
                return c.json({ error: 'You are not authorized to update this workspace' }, 401)
            }

            let uploadedImageUrl: string | undefined

            if (image instanceof File) {
                const file = await storage.createFile(
                    IMAGES_BUCKET_ID,
                    ID.unique(),
                    image
                )
                
                const arrayBuffer = await storage.getFilePreview(
                    IMAGES_BUCKET_ID,
                    file.$id
                )

                uploadedImageUrl = `data:image/png;base64,${Buffer.from(arrayBuffer).toString('base64')}`

            } else {
                uploadedImageUrl = image!
            }

            const workspace = await databases.updateDocument(
                DATABASE_ID,
                WORKSPACES_ID,
                workspaceId,
                {
                    name,
                    image: uploadedImageUrl
                }
            )

            return c.json({ data: workspace })

        }
    )
    .delete(
        '/:workspaceId',
        sessionMiddleware,
        async (c) => {
            const databases = c.get('databases')
            const user = c.get('user')

            const { workspaceId } = c.req.param()

            const member = await getMembers({ databases, workspaceId, userId: user.$id })

            if (!member || member.role !== MemberRole.ADMIN) {
                return c.json({ error: 'You are not authorized to delete this workspace' }, 401)
            }
            await databases.deleteDocument(
                DATABASE_ID,
                WORKSPACES_ID,
                workspaceId
            )
            return c.json({ data: {$id: workspaceId} })
        }
    )
    .post(
        '/:workspaceId/reset-invite-code',
        sessionMiddleware,
        async (c) => {
            const databases = c.get('databases')
            const user = c.get('user')

            const { workspaceId } = c.req.param()

            const member = await getMembers({ databases, workspaceId, userId: user.$id })

            if (!member || member.role !== MemberRole.ADMIN) {
                return c.json({ error: 'You are not authorized to delete this workspace' }, 401)
            }
            const workspace = await databases.updateDocument(
                DATABASE_ID,
                WORKSPACES_ID,
                workspaceId,
                {
                    inviteCode: generateInviteCode(6)
                }
            )
            return c.json({ data: workspace })
        }
    )
    .post(
        '/:workspaceId/join', 
        sessionMiddleware, 
        zValidator('json', z.object({
            code: z.string()
        })),
        async (c) => {
            const { workspaceId } = c.req.param()
            const { code } = c.req.valid('json')

            const databases = c.get('databases')
            const user = c.get('user')

            const member = await getMembers({ databases, workspaceId, userId: user.$id })

            if (member) {
                return c.json({ error: 'You are already a member of this workspace' }, 400)
            }

            const workspace = await databases.getDocument<Workspace>( DATABASE_ID, WORKSPACES_ID, workspaceId )

            if (workspace.inviteCode !== code) {
                return c.json({ error: 'Invalid invite code' }, 400)
            }

            await databases.createDocument(
                DATABASE_ID,
                MEMBERS_ID,
                ID.unique(),
                {
                    userId: user.$id,
                    workspaceId,
                    role: MemberRole.MEMBER
                }
            )

            return c.json({ data: workspace })
        }
    )



export default app