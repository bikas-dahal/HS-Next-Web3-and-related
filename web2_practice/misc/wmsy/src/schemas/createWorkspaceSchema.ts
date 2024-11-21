import { z } from "zod";

export const createWorkspaceSchema = z.object({
    name: z.string().trim().min(1, { message: 'Workspace name is required' }),
    image: z.union([
        z.instanceof(File),
        z.string().transform((val) => val === '' ? null : val)
    ]).optional()
})

export type createWorkspaceType = z.infer<typeof createWorkspaceSchema>
