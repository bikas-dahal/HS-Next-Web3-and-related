import { Task, TaskStatus } from "@/schemas/types";
import { useCallback, useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import { KanbanColumnHeader } from "./kanban-column-header";
// import { useCreateTaskModal } from "../hooks/use-create-task-modal";
import { KanbanCard } from "./kanban-card";

interface DataKanbanProps {
    data: Task[];
    onChange: (tasks: { $id: string, status: TaskStatus, position: number }[]) => void;
}

const boards: TaskStatus[] = [
    TaskStatus.BACKLOG,
    TaskStatus.TODO,
    TaskStatus.IN_PROGRESS,
    TaskStatus.IN_REVIEW,
    TaskStatus.DONE,
]

type TaskState = {
    [key in TaskStatus]: Task[]
}

export const DataKanban = ({ data, onChange }: DataKanbanProps) => {
    const [tasks, setTasks] = useState<TaskState>(() => {
        const initialTasks: TaskState = {
            [TaskStatus.BACKLOG]: [],
            [TaskStatus.TODO]: [],
            [TaskStatus.IN_PROGRESS]: [],
            [TaskStatus.IN_REVIEW]: [],
            [TaskStatus.DONE]: [],
        }
        data.forEach(task => {
            initialTasks[task.status].push(task)
        })
        
        Object.keys(initialTasks).forEach((status) => {
            initialTasks[status as TaskStatus].sort((a, b) => a.position - b.position)
        })
        
        return initialTasks
    })

    useEffect(() => {
        const newTasks: TaskState = {
            [TaskStatus.BACKLOG]: [],
            [TaskStatus.TODO]: [],
            [TaskStatus.IN_PROGRESS]: [],
            [TaskStatus.IN_REVIEW]: [],
            [TaskStatus.DONE]: [],
        }
        data.forEach(task => {
            newTasks[task.status].push(task)
        })

        Object.keys(newTasks).forEach((status) => {
            newTasks[status as TaskStatus].sort((a, b) => a.position - b.position)
        })

        setTasks(newTasks)

    }, [data])

    const onDragEnd = useCallback((result: DropResult) => {
        if (!result.destination) return

        const { source, destination } = result
        const sourceStatus = source.droppableId as TaskStatus
        const destinationStatus = destination.droppableId as TaskStatus

        let updatesPayload: { $id: string, status: TaskStatus, position: number }[] = []

        setTasks((prevTasks) => {
            const newTasks = {...prevTasks};

            // safely remove the task from the source column
            const sourceColumn = [...newTasks[sourceStatus]]
            const [movedTask] = sourceColumn.splice(source.index, 1)

            // update the position of the moved task and if not moved return the task
            if (!movedTask) {
                console.error('Task not found');
                return prevTasks
            }

            // create a new task object with the updated status and position

            const updatedMovedTask = sourceStatus !== destinationStatus
            ? { ...movedTask, status: destinationStatus }
            : movedTask

            // update the source column with the new task list
            newTasks[sourceStatus] = sourceColumn

            // insert the updated task into the destination column
            const destinationColumn = [...newTasks[destinationStatus]]
            destinationColumn.splice(destination.index, 0, updatedMovedTask)

            newTasks[destinationStatus] = destinationColumn

            // prepare minimum payload for the update
            updatesPayload = []

            // always update the position of the moved task
            updatesPayload.push({
                $id: updatedMovedTask.$id,
                status: destinationStatus,
                position: Math.min((destination.index + 1) * 1000, 1_000_000)
            })

            // update the rest of the tasks in the destination column
            newTasks[destinationStatus].forEach((task, index) => {
                if (task && task.$id !== updatedMovedTask.$id) {
                    const newPosition = Math.min((index + 1) * 1000, 1_000_000)

                    if (task.position !== newPosition) {
                        updatesPayload.push({
                            $id: task.$id,
                            status: destinationStatus,
                            position: newPosition
                        })
                    }


                }
            })

            // if task moved between column
            if (sourceStatus !== destinationStatus) {
                newTasks[sourceStatus].forEach((task, index) => {
                    if (task) {
                        const newPosition = Math.min((index + 1) * 1000, 1_000_000)

                        if (task.position !== newPosition) {
                            updatesPayload.push({
                                $id: task.$id,
                                status: sourceStatus,
                                position: newPosition
                            })
                        }
                        
                    }
                })
            }
            return newTasks
        })

        onChange(updatesPayload)
    }, [onChange])
    
    console.log('tasks', tasks);
    console.log('board', boards);

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="flex overflow-x-auto">
                {boards.map((board) => {
                    return (
                        <div key={board} className="flex-1 bg-muted p-1.5 rounded-md mx-2 min-w-[200px]">
                            <KanbanColumnHeader
                                board={board}
                                taskCount={tasks[board].length}
                            />
                            <Droppable droppableId={board}>
                                {(provided) => (
                                    <div 
                                        {...provided.droppableProps} 
                                        ref={provided.innerRef} 
                                        className="min-h-[200px] p-y-1.5"
                                    >
                                        {tasks[board].map((task, index) => (
                                            <Draggable
                                                draggableId={task.$id}
                                                key={task.$id}
                                                index={index}
                                            >
                                                {(provided) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        className="bg-white p-2 rounded-md my-1"
                                                    >
                                                        <KanbanCard task={task} />
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                    </div>  
                                )}
                            </Droppable>
                        </div>
                    )
                })}
            </div>
        </DragDropContext>
    )
}