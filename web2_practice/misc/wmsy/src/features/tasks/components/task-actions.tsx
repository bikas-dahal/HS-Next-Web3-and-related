import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useConfirm } from "@/hooks/use-confirm"
import { ExternalLinkIcon, PencilIcon, Trash2Icon } from "lucide-react"
import { useDeleteTask } from "../api/use-delete-task"
import { useRouter } from "next/navigation"
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id"
import { useEditTaskModal } from "../hooks/use-update-task-modal"

interface TaskActionsProps {
    id: string
    projectId: string
    children: React.ReactNode
}

export const TaskActions = ({ id, projectId, children }: TaskActionsProps) => {
    const workspaceId = useWorkspaceId()
    const router = useRouter()

    const {open} = useEditTaskModal()

    const [ConfirmDialog, confirm] = useConfirm(
        'Are you sure you want to delete this task?',
        "This action cannot be undone.",
        'destructive'
    )

    const { mutate, isPending } = useDeleteTask()

    const onDelete = async () => {
        const ok = await confirm()
        if (!ok) return

        mutate({ param: { taskId: id } })
    }

    const onOpenTask = () => {
        router.push(`/workspaces/${workspaceId}/tasks/${id}`)
    }
    const onOpenProject = () => {
        router.push(`/workspaces/${workspaceId}/projects/${projectId}`)
    }

    return (
        <div className="flex justify-end">
            <ConfirmDialog />
            <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild >
                    {children}
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem disabled={false} onClick={() => onOpenTask()} className="font-medium p-[10px]">
                        <ExternalLinkIcon className="w-4 h-4 mr-2 stroke-2" /> Task Details
                    </DropdownMenuItem>
                    <DropdownMenuItem disabled={false} onClick={() => onOpenProject()} className="font-medium p-[10px]">
                        <ExternalLinkIcon className="w-4 h-4 mr-2 stroke-2" /> Open Project
                    </DropdownMenuItem>
                    <DropdownMenuItem disabled={false} onClick={() => open(id)} className="font-medium p-[10px]">
                        <PencilIcon className="w-4 h-4 mr-2 stroke-2" /> Edit Task
                    </DropdownMenuItem>
                    <DropdownMenuItem disabled={isPending} onClick={() => onDelete()} className="font-medium p-[10px]">
                        <Trash2Icon className="w-4 h-4 text-amber-700 focus:text-amber-800 mr-2 stroke-2" /> Delete Task
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}