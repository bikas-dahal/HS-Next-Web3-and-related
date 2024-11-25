import { DATABASE_ID, MEMBERS_ID, PROJECTS_ID, TASKS_ID } from "@/config";
import { getMembers } from "@/features/members/utils";
import { createAdminClient } from "@/lib/appwrite";
import { sessionMiddleware } from "@/lib/session-middleware";
import { createTaskSchema } from "@/schemas/taskSchema";
import { Project, TaskStatus } from "@/schemas/types";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { ID, Query } from "node-appwrite";
import { z } from "zod";

const app = new Hono()
    .get(
        '/',
        sessionMiddleware,
        zValidator('query', z.object({
            workspaceId: z.string(),
            projectId: z.string().nullish(),
            assigneeId: z.string().nullish(),
            status: z.nativeEnum(TaskStatus).nullish(),
            search: z.string().nullish(),
            dueDate: z.string().nullish(),
        })),
        async (c) => {
            const { users } = await createAdminClient()
            const databases = c.get('databases')
            const user = c.get('user')

            const {
                workspaceId,
                projectId,
                dueDate,
                status,
                assigneeId,
                search
            } = c.req.valid('query')

            const member = await getMembers({
                databases,
                workspaceId,
                userId: user.$id
            })

            if (!member) {
                return c.json({
                    error: 'Unauthorized'
                }, 401)
            }

            const query = [
                Query.equal('workspaceId', workspaceId),
                Query.orderDesc('$createdAt')
            ]

            if (projectId) {
                console.log('project id', projectId);
                query.push(Query.equal('projectId',projectId))
            }

            if (status) {
                console.log('Status', status);
                query.push(Query.equal('status',status))
            }

            if (assigneeId) {
                console.log('AssigneeId', assigneeId);
                query.push(Query.equal('assigneeId',assigneeId))
            }

            if (dueDate) {
                console.log('DueDate', dueDate);
                query.push(Query.equal('dueDate',dueDate))
            }

            if (search) {
                console.log('Search', search);
                query.push(Query.equal('name',search))
            }

            const tasks = await databases.listDocuments(
                DATABASE_ID,
                TASKS_ID,
                query
            )

            const projectIds = tasks.documents.map((task) => task.projectId)
            const assigneeIDs = tasks.documents.map((task) => task.assigneeID)

            const projects = await databases.listDocuments<Project>(
                DATABASE_ID,
                PROJECTS_ID,
                projectIds.length > 0 ? [Query.equal('$id', projectIds)] : []
            )

            const members = await databases.listDocuments(
                DATABASE_ID,
                MEMBERS_ID,
                assigneeIDs.length > 0 ? [Query.equal('$id', assigneeIDs)] : []
            )

            const assignees = await Promise.all(
                members.documents.map(async (member) => {
                    const user = await users.get(member.userId)

                    return {
                        ...member,
                        name: user.name,
                        email: user.email
                    }
                })
            )

            const populatedTasks = tasks.documents.map((task) => {
                const project = projects.documents.find(
                    (project) => project.$id === task.projectId
                )

                const assignee = assignees.find(
                    (assigne) => assigne.$id === task.assineeId
                )

                return {
                    ...task,
                    project,
                    assignee
                }

            })

            return c.json({
                data: {
                    ...tasks,
                    documents: populatedTasks
                }
            })
        }
    )
    .post(
        '/',
        sessionMiddleware,
        zValidator('json', createTaskSchema),
        async (c) => {
            const user = c.get('user')
            const databases = c.get('databases')
            const {
                name, 
                status, 
                projectId, 
                assigneeId, 
                dueDate, 
                workspaceId
            } = c.req.valid('json')

            const member = await getMembers({
                databases,
                workspaceId,
                userId: user.$id
            })

            if (!member) {
                return c.json({
                    error: 'Unauthorized'
                }, 401)
            }

            const highestPositionTask = await databases.listDocuments(
                DATABASE_ID,
                TASKS_ID,
                [
                    Query.equal('status', status),
                    Query.equal('workspaceId', workspaceId),
                    Query.orderAsc('position'),
                    Query.limit(1),
                ]
            )

            const newPosition = highestPositionTask.documents.length > 0 ?
                highestPositionTask.documents[0].position + 1000 : 1000;

            const task = await databases.createDocument(
                DATABASE_ID,
                TASKS_ID,
                ID.unique(),
                {
                    name, 
                    status,
                    workspaceId,
                    projectId,
                    assigneeId,
                    position: newPosition,
                    dueDate
                }
            )

            return c.json({
                data: task
            })
        }
    )



export default app
