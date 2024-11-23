'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import { useJoinWorkspace } from "../api/use-join-workspace"
import { useInviteCode } from "../hooks/use-invite-code"
import { useWorkspaceId } from "../hooks/use-workspace-id"
import { useRouter } from "next/navigation"

interface JoinWorkspaceFormProps {
    initialValues?: {
        name: string
    }   ,
    code: string
    workspaceId: string
}

export const JoinWorkspaceForm = ({initialValues }: JoinWorkspaceFormProps) => {
    const router = useRouter()
    const workspaceId = useWorkspaceId()
    const inviteCode = useInviteCode()
    const { mutate, isPending } = useJoinWorkspace()

    const onSubmit =  () => {
     mutate(
        { param: {workspaceId}, json: { code: inviteCode} },
        {
            onSuccess: ({ data }) => {
                router.push(`/workspaces/${data.$id}`)
            }
        }
    )
    }

    return (
        <Card className="w-full h-full">
            <CardHeader className="">
                <CardTitle className="text-xl font-bold">
                    Join Workspace
                </CardTitle>
            <CardDescription className="p-4">
                You've been invited to join the workspace <strong>{initialValues?.name}</strong>
            </CardDescription>
            </CardHeader>
            <Separator className="px-4" />
            <CardContent className="p-4">
                <div className="flex flex-col lg:flex-row items-center justify-between">
                    <Button disabled={isPending} size={'lg'} asChild variant={"teritary"} type="button" className="w-full lg:w-auto">
                        <Link href="/">Cancel</Link>
                    </Button>
                    <Button disabled={isPending} onClick={onSubmit} size={'lg'}  variant={"primary"} type="button" className="w-full lg:w-auto">
                        Join
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}