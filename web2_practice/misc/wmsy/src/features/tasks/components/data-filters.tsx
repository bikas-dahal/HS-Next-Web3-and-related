import { Select, SelectContent, SelectItem, SelectSeparator, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useGetMembers } from "@/features/members/api/use-get-members"
import { useGetProjects } from "@/features/projects/api/use-get-projects"
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id"
import { TaskStatus } from "@/schemas/types"
import { ListCheckIcon } from "lucide-react"
import { useTaskFilters } from "../hooks/use-task-filters"

interface DataFiltersProps {
    hideProjectFilter?: boolean
}

export const DataFilters = ({ hideProjectFilter }: DataFiltersProps) => {

    const workspaceId = useWorkspaceId()
    const { data: projects, isLoading: isLoadingProjects } = useGetProjects({ workspaceId })
    const { data: members, isLoading: isLoadingMembers } = useGetMembers({ workspaceId })

    const isLoading = isLoadingMembers || isLoadingProjects

    const projectOptions = projects?.documents.map((project) => ({
        value: project.$id,
        label: project.name
    }))

    const memberOptions = members?.documents.map((member) => ({
        value: member.$id,
        label: member.name
    }))

    const [{
        assigneeId,
        projectId,
        status,
        dueDate,
        search
    }, setFilters] = useTaskFilters();


    const onStatusChange = (value: string) => {
        if (value == 'all') {
            setFilters({ status: null })
        } else {
            setFilters({ status: value as TaskStatus})
        }
    }


    if (isLoading) return null 

    return (
        <div className="flex flex-col lg:flex-row gap-2">
            <Select
                defaultValue={status ?? undefined}
                onValueChange={(value) => onStatusChange(value)}
            >
                <SelectTrigger className="w-full lg:w-auto h-8">
                    <div className="flex items-center pr-2">
                        <ListCheckIcon className="size-4 mr-2" />
                        <SelectValue placeholder='All status' />
                    </div>
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All statuses</SelectItem>
                    <SelectSeparator />
                    <SelectItem value={TaskStatus.BACKLOG}>
                        Backlog
                    </SelectItem>
                    <SelectItem value={TaskStatus.IN_PROGRESS}>
                        In Progress
                    </SelectItem>
                    <SelectItem value={TaskStatus.IN_REVIEW}>
                        In Review
                    </SelectItem>
                    <SelectItem value={TaskStatus.TODO}>
                        Todo
                    </SelectItem>
                    <SelectItem value={TaskStatus.DONE}>
                        Done
                    </SelectItem>
                </SelectContent>
            </Select>
        </div>
    )
}