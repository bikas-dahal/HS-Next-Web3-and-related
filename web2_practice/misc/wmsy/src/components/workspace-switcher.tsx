'use client'

import { RiAddCircleFill } from "react-icons/ri"

import { useGetWorkspaces } from "@/features/workspaces/api/use-get-workspaces"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { WorkspaceAvatar } from "@/features/workspaces/components/workspace-avatar"
import { useRouter } from "next/navigation"
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id"
import { useCreateWorkspaceModal } from "@/features/workspaces/hooks/use-create-workspace-modal"

export const WorkspaceSwitcher = () => {

    const router = useRouter()

    const workspaceId = useWorkspaceId()
    const onSelect = (workspaceId: string) => {
        router.push(`/workspaces/${workspaceId}`)
    }

    const { data: workspaces } = useGetWorkspaces()
    const { open } = useCreateWorkspaceModal()


    return (
        <div className="flex flex-col gap-y-2">
            <div className="flex items-center justify-between">
                <p className="text-xs uppercase text-neutral-500">Workspaces</p>
                <RiAddCircleFill onClick={open} className="size-5 text-neutral-500 cursor-pointer hover:opacity-75 transition" />
            </div>
            <Select onValueChange={onSelect} value={workspaceId}>
                <SelectTrigger className="w-full bg-neutral-100 p-2 font-medium rounded-md text-neutral-500">
                    <SelectValue placeholder="Select a workspace" /> 
                </SelectTrigger>
                <SelectContent>
                    {workspaces?.documents.map(workspace => (
                        <SelectItem key={workspace.$id} value={workspace.$id} className="p-2 hover:bg-neutral-200 cursor-pointer">
                            <div className="flex justify-start items-center gap-3 font-medium">
                                <WorkspaceAvatar name={workspace.name} image={workspace.image} />
                                <span className="truncate">{workspace.name}</span>
                            </div>
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    )
}