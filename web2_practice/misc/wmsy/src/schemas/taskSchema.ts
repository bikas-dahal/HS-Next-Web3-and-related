import { z } from "zod";
import { TaskStatus } from "./types";

export const createTaskSchema = z.object({
    name: z.string().trim().min(1, 'Name is required'),
    status: z.nativeEnum(TaskStatus, { required_error: 'Status is required'}),
    workspaceId: z.string().min(1, 'required'),
    projectId: z.string().min(1, 'required'),
    dueDate: z.coerce.date(),
    assigneeId: z.string().trim().min(1, 'Required'),
    description: z.string().optional()
})

export type CreateTaskType = z.infer<typeof createTaskSchema>
