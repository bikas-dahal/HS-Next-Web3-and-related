import { createAdminClient } from "@/lib/appwrite";
import { sessionMiddleware } from "@/lib/session-middleware";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";
import { getMembers } from "../utils";
import { DATABASE_ID, MEMBERS_ID } from "@/config";
import { Query } from "node-appwrite";
import { MemberRole } from "@/schemas/memberTypes";

const app = new Hono()
    .get(
        '/', 
        sessionMiddleware,
        zValidator('query', z.object({ workspaceId: z.string() })),
        async (c) => {
            const { users } = await createAdminClient()
            const databases = c.get('databases')
            const user = c.get('user')

            const { workspaceId } = c.req.valid('query')

            const member = await getMembers({
                databases, 
                workspaceId,
                userId: user.$id
            })

            if (!member) {
                return c.json({
                    message: 'Unauthorized'
                }, 401)
            }

            const members = await databases.listDocuments(
                DATABASE_ID,
                MEMBERS_ID,
                [Query.equal('workspaceId', workspaceId)]
            )

            const populatedMembers = await Promise.all(
                members.documents.map(async (member) => {
                    const user = await users.get(member.userId)
                    return {
                        ...member,
                        name: user.name,
                        email: user.email
                    }
                })
            )

            return c.json({
                data: {
                    ...members,
                    documents: populatedMembers
                }
            })
    })
    .delete(
        '/:memberId',
        sessionMiddleware,
        async (c) => {
            const { memberId } = c.req.param()
            const user = c.get('user')
            const databases = c.get('databases')

            const memberToDelete = await databases.getDocument(
                DATABASE_ID,
                MEMBERS_ID,
                memberId
            )

            const allMembersInWorkspace = await databases.listDocuments(
                DATABASE_ID,
                MEMBERS_ID,
                [Query.equal('workspaceId', memberToDelete.workspaceId)]
            )

            const member = await getMembers({
                databases,
                workspaceId: memberToDelete.workspaceId,
                userId: user.$id
            })

            if (!member) {
                return c.json({
                    message: 'Unauthorized'
                }, 401)
            }

            if (memberToDelete.$id === user.$id || member.role !== 'admin') {
                return c.json({
                    message: 'You cannot delete yourself'
                }, 400)
            }

            if (allMembersInWorkspace.total === 1) {
                return c.json({
                    message: 'You cannot delete the last member in the workspace'
                }, 400)
            }

            await databases.deleteDocument(
                DATABASE_ID,
                MEMBERS_ID,
                memberId
            )

            return c.json({
                data: {
                    $id: memberToDelete.$id
                }
            })
        }
    )
    .patch(
        '/:memberId',
        sessionMiddleware,
        zValidator('json', z.object({ role: z.nativeEnum(MemberRole)})),
        async (c) => {
            const { memberId } = c.req.param()
            const user = c.get('user')
            const databases = c.get('databases')
            const { role } = c.req.valid('json')

            const memberToUpdate = await databases.getDocument(
                DATABASE_ID,
                MEMBERS_ID,
                memberId
            )

            const allMembersInWorkspace = await databases.listDocuments(
                DATABASE_ID,
                MEMBERS_ID,
                [Query.equal('workspaceId', memberToUpdate.workspaceId)]
            )

            const member = await getMembers({
                databases,
                workspaceId: memberToUpdate.workspaceId,
                userId: user.$id
            })

            if (!member) {
                return c.json({
                    message: 'Unauthorized'
                }, 401)
            }

            if ( member.role !== 'admin') {
                return c.json({
                    message: 'You are not admin of this workspace'
                }, 400)
            }

            if (allMembersInWorkspace.total === 1) {
                return c.json({
                    message: 'You cannot change the last member in the workspace'
                }, 400)
            }

            await databases.updateDocument(
                DATABASE_ID,
                MEMBERS_ID,
                memberId,
                {
                    role
                }
            )

            return c.json({
                data: {
                    $id: memberToUpdate.$id
                }
            })
        }
    )

export default app