'use client'

import { useFormState, useFormStatus } from 'react-dom'
import { createComment } from '@/lib/actions'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import {toast, useToast} from "@/hooks/use-toast";
import { useEffect } from 'react'

const initialState = {
    status: '',
    error: ''
}

export function CommentForm({ quoteId }: { quoteId: string }) {
    const [state, formAction] = useFormState(createComment, initialState)
    const { pending } = useFormStatus()

    const { toast } = useToast()

    useEffect(() => {
        if (state.status === 'SUCCESS') {
            toast({
                title: 'Success',
                description: 'Your idea is live.',
                variant: 'default',
            })
            // Optionally trigger a refetch of comments
        } else if (state.status === 'ERROR') {
            toast({
                title: 'Error',
                description: 'Please check your input and try again',
                variant: 'destructive',
            })
        }
    }, [state])

    return (
        <form action={formAction} className="space-y-4">
            <input type="hidden" name="quoteId" value={quoteId} />
            <Textarea 
                name="comment" 
                placeholder="Write your thought on this..." 
                required 
                className="w-full border-2 border-gray-800 bg-sky-200 text-slate-900 text-xl rounded-lg p-4"
            />
            <Button 
                type="submit" 
                disabled={pending}
                className="w-full bg-yellow-200 text-slate-950 rounded-lg p-4"
            >
                {pending ? 'Posting...' : 'Post Comment'}
            </Button>
        </form>
    )
}