'use client'

import React, {useState} from 'react'
import {Workflow} from "@prisma/client";
import {Card, CardContent} from "@/components/ui/card";
import {WorkflowStatus} from "@/types/workflow";
import {FileTextIcon, MoreVertical, PlayIcon, ShuffleIcon, TrashIcon} from "lucide-react";
import {cn} from "@/lib/utils";
import Link from "next/link";
import {Button, buttonVariants} from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Tooltip} from "@/components/ui/tooltip";
import TooltipWrapper from "@/components/TooltipWrapper";
import DeleteWorkflowDialog from "@/app/(dashboard)/workflows/_components/DeleteWorkflowDialog";

const WorkflowCard = ({ workflow }: {workflow: Workflow}) => {

    const statusColors = {
        [WorkflowStatus.DRAFT]: 'bg-yellow-400 text-yellow-600',
        [WorkflowStatus.PUBLISHED]: 'bg-primary'
    }
    console.log(statusColors)

    const isDraft = workflow.status === WorkflowStatus.DRAFT;

    return (
        <Card className={'border border-separate shadow-sm rounded-lg overflow-hidden hover:shadow-md dark:shadow-primary/30'}>
            <CardContent className={'p-4 flex items-center justify-between h-[100px]'}>
                <div className={'flex items-center justify-end space-x-3'}>
                <div className={cn('w-10 h-10 rounded-full flex items-center justify-center', statusColors[workflow.status as WorkflowStatus])}>

                    {isDraft ? (
                        <FileTextIcon className={'h-5 w-5'} />
                    ) : (
                        <PlayIcon className={'h-5 w-5 text-white'} />
                    )}
                </div>
                <div>
                    <h3 className={'text-base font-bold text-muted-foreground flex items-center'}>
                        <Link href={`/workflow/editor/${workflow.id}`} className={'flex items-center hover:underline'}>
                            {workflow.name}
                        </Link>
                        {isDraft && (
                            <span className={'ml-2 px-2 py-0.5 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full'}>
                                Draft
                            </span>
                        )}
                    </h3>
                </div>
                </div>
                <div className={'flex items-center space-x-2'}>
                    <Link href={`/workflow/editor/${workflow.id}`} className={cn(buttonVariants({variant: 'outline', size: 'sm'}), 'flex items-center gap-2')}>
                        <ShuffleIcon size={16} />
                        Edit
                    </Link>
                    <WorkflowActions workflowName={workflow.name} workflowId={workflow.id} />
                </div>
            </CardContent>
        </Card>
    )
}

function WorkflowActions ({ workflowName, workflowId }: {workflowName: string, workflowId: string}) {

    const [showDeleteDialog, setShowDeleteDialog] = useState(false)

    return (
        <>
            <DeleteWorkflowDialog open={showDeleteDialog} setOpen={setShowDeleteDialog} workflowName={workflowName} workflowId={workflowId} />
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                    <Button variant={'outline'} size={'sm'}>
                <TooltipWrapper content={'More Actions'}>
                    <div className={'flex items-center justify-center w-full h-full'}>
                            <MoreVertical size={18} />
                    </div>
                </TooltipWrapper>
                    </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align={'end'}>
                <DropdownMenuLabel>
                    Actions
                </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className={'text-destructive flex items-center gap-2'} onSelect={() => setShowDeleteDialog((prev) => !prev)}>
                <TrashIcon size={16} /> Delete
            </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
        </>
    )

}


export default WorkflowCard
