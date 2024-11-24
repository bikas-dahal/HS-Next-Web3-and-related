import { z } from "zod";

export const createProjectSchema = z.object({
    name: z.string().trim().min(1, { message: 'Workspace name is required' }),
    image: z.union([
        z.instanceof(File),
        z.string().transform((val) => val === '' ? null : val)
    ]).optional(),
    workspaceId: z.string().trim().min(1, { message: 'Workspace ID is required' }),
})

export type createProjectType = z.infer<typeof createProjectSchema>

export const updateProjectSchema = z.object({
    name: z.string().trim().min(1, { message: 'Workspace name is required' }).optional(),
    image: z.union([
        z.instanceof(File),
        z.string().transform((val) => val === '' ? null : val)
    ]).optional(),
})

export type updateProjectType = z.infer<typeof updateProjectSchema>
