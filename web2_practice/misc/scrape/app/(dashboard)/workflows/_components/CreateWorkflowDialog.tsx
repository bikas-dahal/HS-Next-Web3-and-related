'use client'

import React, { useCallback } from 'react'
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Layers2Icon, Loader2 } from "lucide-react"
import CustomDialogHeader from "@/components/CustomDialogHeader"
import { useForm } from "react-hook-form"
import { createWorkflowSchema, createWorkflowSchemaType } from "@/schema/workflow"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useMutation } from "@tanstack/react-query"
import { CreateWorkflow } from "@/actions/workflows/createWorkflow"
import { toast } from "sonner"

const CreateWorkflowDialog = ({ triggerText }: { triggerText?: string }) => {
    const [open, setOpen] = React.useState(false)

    const form = useForm<createWorkflowSchemaType>({
        resolver: zodResolver(createWorkflowSchema),
        defaultValues: {
            name: '',
            description: ''
        }
    })

    const { mutate, isPending } = useMutation({
        mutationFn: CreateWorkflow,
        onSuccess: () => {
            toast.success('Workflow created!')
            setOpen(false)
            form.reset()
        },
        onError: () => {
            toast.error('Failed to create workflow')
        }
    })

    const onSubmit = useCallback((values: createWorkflowSchemaType) => {
        mutate(values)
    }, [mutate])

    return (
        <Dialog open={open} onOpenChange={(open) => {
            form.reset()
            setOpen(open)
        }}>
            <DialogTrigger asChild>
                <Button>
                    {triggerText ?? 'Create Workflow'}
                </Button>
            </DialogTrigger>
            <DialogContent className="px-0">
                <CustomDialogHeader
                    icon={Layers2Icon}
                    title="Create Workflow"
                    subTitle="Start building your workflow"
                />
                <div className="p-6">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="flex gap-1 items-center">
                                            Name
                                            <span className="text-xs text-primary">(required)</span>
                                        </FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter workflow name" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            Choose a descriptive and unique name
                                        </FormDescription>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="flex gap-1 items-center">
                                            Description
                                            <span className="text-xs text-muted-foreground">(optional)</span>
                                        </FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Enter workflow description"
                                                className="resize-none"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Provide a brief description of what your workflow does
                                        </FormDescription>
                                    </FormItem>
                                )}
                            />

                            <Button type="submit" className="w-full" disabled={isPending}>
                                {isPending ? <Loader2 className="animate-spin" /> : 'Proceed'}
                            </Button>
                        </form>
                    </Form>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default CreateWorkflowDialog