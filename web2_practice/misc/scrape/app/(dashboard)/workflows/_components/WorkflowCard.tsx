'use client'

import React from 'react'
import {Workflow} from "@prisma/client";
import {Card, CardContent} from "@/components/ui/card";
import {WorkflowStatus} from "@/types/workflow";
import {FileTextIcon, PlayIcon} from "lucide-react";
import {cn} from "@/lib/utils";
import Link from "next/link";
import {buttonVariants} from "@/components/ui/button";

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
                    <Link href={`/workflow/editor/${workflow.id}`} className={cn(buttonVariants({variant: 'outline'}))}
                </div>
            </CardContent>
        </Card>
    )
}
export default WorkflowCard
