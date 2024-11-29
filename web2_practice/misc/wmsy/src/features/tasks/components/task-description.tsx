import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Task } from "@/schemas/types";
import { PencilIcon, XIcon } from "lucide-react";
import { useState } from "react";
import { useUpdateTask } from "../api/use-update-task";
import { Textarea } from "@/components/ui/textarea";

interface TaskDescriptionProps {
    task: Task
}

export const TaskDescription = ({ task }: TaskDescriptionProps) => {

    const [isEditing, setIsEditing] = useState(false)
    const [value, setValue] = useState(task.description)

    const { mutate, isPending } = useUpdateTask()

    const handleSave = () => {
        mutate({
            json: { description: value },
            param: { taskId: task.$id }
        }, {
            onSuccess: () => {
                setIsEditing(false)
            }
        })
    }

    return (
        <div className="p-4 border rounded-lg">
            <div className="flex items-center justify-between">
                <p className="text-lg font-semibold">Overview</p>
                <Button onClick={() => setIsEditing((prev) => !prev)} size={'sm'} variant={'secondary'}>
                    {isEditing ? (
                        <XIcon className="size-4" />
                    ) : (
                        <PencilIcon className="w-4 h-4 " />
                    )}
                    {isEditing ? 'Cancel' : 'Edit'}
                </Button>
            </div>
            <Separator className="my-4" />
            {isEditing ? (
                <div className="flex flex-col gap-y-4">
                    <Textarea placeholder="Add a description" rows={4} disabled={isPending} value={value} onChange={(e) => setValue(e.target.value)} />
                    <Button onClick={handleSave} disabled={isPending} className="w-fit ml-auto" variant={'primary'} size={'sm'}>
                        {isPending ? 'Saving...' : 'Save Changes'}
                    </Button>
                </div>
            ): (
                <div>
                    {task.description || (
                        <span className="text-muted-foreground">
                            Edit to add a description
                        </span>
                    )}
                </div>
            )}
        </div>
    )
}