'use client'
import { DottedSeparator } from "@/components/dotted-separator"
import { PageError } from "@/components/page-error"
import { PageLoader } from "@/components/page-loader"
import { useGetTask } from "@/features/tasks/api/use-get-task"
import { useTaskId } from "@/features/tasks/api/use-task-id"
import { TaskBreadcrumbs } from "@/features/tasks/components/task-breadcrums"
import { TaskDescription } from "@/features/tasks/components/task-description"
import { TaskOverview } from "@/features/tasks/components/task-overview"

 

export const TaskIdClient = () => {
    const taskId = useTaskId()

    const { data: task, isLoading: isLoadingTask } = useGetTask({ taskId })

    if (isLoadingTask) {
        return <PageLoader />
    }

    if (!task) {
        return <PageError message="Task not found" />
    }
    // console.log('task is',task);
    

    return (
        <div className="flex flex-col">
            <TaskBreadcrumbs project={task.project} task={task} />
            <DottedSeparator className="my-6" />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <TaskOverview task={task} />
                <TaskDescription task={task} />
            </div>
        </div>
    )
}