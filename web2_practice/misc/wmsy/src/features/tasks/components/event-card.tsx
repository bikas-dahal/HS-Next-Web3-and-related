import { MemberAvatar } from "@/features/members/components/member-avatar";
import { ProjectAvatar } from "@/features/projects/components/project-avatar";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { cn } from "@/lib/utils";
import { Member, Project, TaskStatus } from "@/schemas/types";
import { useRouter } from "next/navigation";

interface EventCardProps {
    id: string;
    title: string;
    project: Project;
    assignee: Member;
    status: TaskStatus;
}

const statusColorMap: Record<TaskStatus, string> = {
    [TaskStatus.TODO]: 'border-l-red-500',
    [TaskStatus.IN_PROGRESS]: 'border-l-yellow-500',
    [TaskStatus.IN_REVIEW]: 'border-l-blue-500',
    [TaskStatus.BACKLOG]: 'border-l-pink-500',
    [TaskStatus.DONE]: 'border-l-green-600',
}

export const EventCard = ({ title, project, assignee, status, id }: EventCardProps) => {

    const workspaceId = useWorkspaceId()
    const router = useRouter()

    const onClick = (
        e: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        e.stopPropagation()

        router.push(`/workspaces/${workspaceId}/tasks/${id}`)
    }

    return (
        <div className="px-2">
            <div onClick={onClick} className={cn(
                'p-1.5 text-xs border bg-white text-primary rounded-md border-l-4 flex flex-col gap-y-1.5 cursor-pointer hover:opacity-75 transition',
                statusColorMap[status]
            )}>
                <p>{title}</p>
                <div className="flex items-center gap-x-1">
                    <MemberAvatar name={assignee?.name}  />
                    <div className="size-1 rounded-full bg-neutral-400" />
                    <ProjectAvatar name={project?.name} image={project?.image} />
                </div>
            </div>
        </div>
    )
}