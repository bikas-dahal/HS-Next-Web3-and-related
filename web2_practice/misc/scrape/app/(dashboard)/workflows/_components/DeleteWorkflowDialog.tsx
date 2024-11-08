'use client'

import React from 'react'
import {
    AlertDialog, AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from "@/components/ui/alert-dialog";
import {Input} from "@/components/ui/input";
import {useMutation} from "@tanstack/react-query";
import {deleteWorkflow} from "@/actions/workflows/deleteWorkflow";
import {toast} from "sonner";

interface Props {
    open: boolean
    setOpen: (open: boolean) => void
    workflowName: string
    workflowId: string
}

const DeleteWorkflowDialog = ({ open, setOpen, workflowName, workflowId}: Props) => {

    const [confirmText, setConfirmText] = React.useState<string>("");

    const deleteMutation = useMutation({
        mutationFn: deleteWorkflow,
        onSuccess: () => {
            toast.success('Workflow deleted successfully.', {
                id: workflowId,
            })
            setConfirmText('')
        },
        onError: () => {
            toast.error('Failed to delete workflow', {
                id: workflowId,
            })
        },
    })

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Are you sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        You will no longer able to recover it.
                        <div className={'flex flex-col py-4 gap-2 '}>
                            <p>Enter <b>{workflowName}</b> to confirm:</p>
                            <Input value={confirmText} onChange={(e) => setConfirmText(e.target.value)} />
                        </div>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={() => setConfirmText('')}>
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                        disabled={confirmText !== workflowName || deleteMutation.isPending}
                        className={'bg-destructive text-destructive-foreground hover:bg-destructive/90'}
                        onClick={() => {
                            toast.loading('Deleting workflow...', {
                                id: workflowId
                            })
                            deleteMutation.mutate(workflowId)
                        }}
                    >
                        Delete
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
export default DeleteWorkflowDialog
