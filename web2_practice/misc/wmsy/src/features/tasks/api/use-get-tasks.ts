import {useQuery} from "@tanstack/react-query";
import {client} from "@/lib/rpc";
import { TaskStatus } from "@/schemas/types";

interface useGetTasksProps {
    workspaceId: string 
    projectId?: string | null
    status?: TaskStatus | null
    assigneeId?: string | null
    dueDate?: string | null
    search?: string | null
}

export const useGetTasks = ({ 
    workspaceId,
    projectId,
    status,
    assigneeId,
    dueDate,
    search
}: useGetTasksProps) => {
    const query = useQuery({
        queryKey: ['tasks', workspaceId, projectId, dueDate, status, assigneeId, search],
        queryFn: async () => {
            
            const response = await client.api.tasks.$get({ 
                query: { 
                    workspaceId,
                    projectId: projectId ?? undefined, 
                    status: status ?? undefined,
                    dueDate: dueDate ?? undefined, 
                    assigneeId: assigneeId ?? undefined, 
                    search: search ?? undefined 
                } 
            })

            if (!response.ok) throw new Error('Failed to fetch tasks')

            const { data } = await response.json()

            return  data
        }
    })
    return query
}