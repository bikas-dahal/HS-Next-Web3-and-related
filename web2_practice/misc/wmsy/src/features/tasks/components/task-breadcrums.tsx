import { Button } from "@/components/ui/button";
import { ProjectAvatar } from "@/features/projects/components/project-avatar";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { Project, Task } from "@/schemas/types";
import { ChevronRightIcon, TrashIcon } from "lucide-react";
import Link from "next/link";
import { useDeleteTask } from "../api/use-delete-task";
import { useConfirm } from "@/hooks/use-confirm";
import { useRouter } from "next/navigation";

interface TaskBreadcrumsProps {
    project: Project;
    task: Task;
}

export const TaskBreadcrumbs = ({ project, task }: TaskBreadcrumsProps) => {

    const workspaceId = useWorkspaceId()
    const router = useRouter()
    const {mutate: deleteTask, isPending} = useDeleteTask()

    const [ConfirmDialog, confirm] = useConfirm(
        'Delete Task',
        'Are you sure you want to delete this task?',
        'destructive'
    )

    const handleDeleteTask = async () => {
        const ok = await confirm()
        if (!ok) return

        deleteTask({ param: { taskId: task.$id } }, {
            onSuccess: () => {
                router.push(`/workspaces/${workspaceId}/tasks`)
            }
        })
    }


    return (
        <div className="flex items-center gap-x-2">
            <ConfirmDialog />
            <ProjectAvatar name={project?.name} image={project?.image} classname="size-6 lg:size-8" />
            <Link href={`/workspaces/${workspaceId}/projects/${project.$id}`}>
                <p className="text-sm lg:text-lg font-semibold text-muted-foreground hover:opac75 transition">
                    {project.name}
                </p>
            </Link>
            <ChevronRightIcon className="size-4 text-muted-foreground lg:size-5" />
            <p className="text-sm lg:text-lg font-semibold">
                {task.name}
            </p>
            <Button onClick={handleDeleteTask} disabled={isPending} className="ml-auto" variant={'destructive'} size={'sm'}>
                <TrashIcon className="size-4 lg:mr-2" />
                <span className="hidden lg:block">
                    Delete Task
                </span>
            </Button>
        </div>
    )
}