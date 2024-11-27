import { Select, SelectContent, SelectItem, SelectSeparator, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useGetMembers } from "@/features/members/api/use-get-members"
import { useGetProjects } from "@/features/projects/api/use-get-projects"
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id"
import { TaskStatus } from "@/schemas/types"
import { CrossIcon, FolderIcon, ListCheckIcon, UserIcon, XIcon } from "lucide-react"
import { useTaskFilters } from "../hooks/use-task-filters"
import { DatePicker } from "@/components/date-picker"

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

    const onAssigneeChange = (value: string) => {
        if (value == 'all') {
            setFilters({ assigneeId: null })
        } else {
            setFilters({ assigneeId: value as string})
        }
    }

    const onProjectChange = (value: string) => {
        setFilters({ projectId: value === 'all' ? null : value as string })
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


            <Select
                defaultValue={assigneeId ?? undefined}
                onValueChange={(value) => onAssigneeChange(value)}
            >
                <SelectTrigger className="w-full lg:w-auto h-8">
                    <div className="flex items-center pr-2">
                        <UserIcon className="size-4 mr-2" />
                        <SelectValue placeholder='All assignees' />
                    </div>
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All assigness</SelectItem>
                    <SelectSeparator />
                    {memberOptions?.map((member) => (
                        <SelectItem key={member.value} value={member.value}>
                            {member.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            <Select
                defaultValue={projectId ?? undefined}
                onValueChange={(value) => onProjectChange(value)}
            >
                <SelectTrigger className="w-full lg:w-auto h-8">
                    <div className="flex items-center pr-2">
                        <FolderIcon className="size-4 mr-2" />
                        <SelectValue placeholder='All projects' />
                    </div>
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All projects</SelectItem>
                    <SelectSeparator />
                    {projectOptions?.map((project) => (
                        <SelectItem key={project.value} value={project.value}>
                            {project.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <div className="flex">
            <DatePicker 
                placeholder="Due date"
                className="h-8 w-full lg:w-auto"
                value={dueDate ? new Date(dueDate) : undefined}
                onChange={(date) => setFilters({ dueDate: date?.toISOString() ?? null })}
            />
            <div className="cursor-pointer flex items-center" onClick={() => setFilters({ dueDate: null})}><XIcon className="size-4 ml-1" /></div>
            </div>
            
        </div>
    )
}