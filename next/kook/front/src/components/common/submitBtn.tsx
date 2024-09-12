'use client'

import { useFormStatus } from 'react-dom'
import {Button} from "@/components/ui/button";

interface submitButtonProps {
    text: string
}

export function SubmitButton ({ text }: submitButtonProps): JSX.Element {
    const { pending } = useFormStatus()

    return (
        <Button type='submit' disabled={pending}>
            {pending ? 'Processing': `${text}`}
        </Button>
    )
}