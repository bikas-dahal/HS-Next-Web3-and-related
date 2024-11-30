import { ResponsiveModal } from "@/components/responsive-modal"
import { Button, ButtonProps } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

import { useState } from "react"

export const useConfirm = (
    title: string,
    message: string,
    variant: ButtonProps['variant'] = "primary"
): [ () => JSX.Element, () => Promise<unknown>] => {
    const [promise, setPromise] = useState<{ resolve: (value: boolean) => void } | null>(null)

    const confirm = () => {
        return new Promise((resolve) => {
            setPromise({ resolve })
        })
    }

    const handleClose = () => {
        setPromise(null)
    }

    const handleConfirm = () => {
        promise?.resolve(true)
        handleClose()
    }

    const handleCancel = () => {
        promise?.resolve(false)
        handleClose()
    }

    const confirmationDialog = () => (
        <ResponsiveModal open={promise !== null} onOpenChange={handleClose}>
            <Card className="w-full h-full shadow-none">
                <CardContent className="pt-8">
                    <CardHeader className="p-0 text-center">
                        <CardTitle>{title}</CardTitle>
                        <CardDescription>{message}</CardDescription>
                    </CardHeader>
                    <div className="pt-4 w-full flex flex-col gap-4 lg:flex-row items-center justify-center">
                        <Button onClick={handleCancel} className="w-full lg:w-auto" variant="teritary">
                            Cancel
                        </Button>
                        <Button onClick={handleConfirm} className="w-full lg:w-auto" variant={variant}>
                            Confirm
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </ResponsiveModal>
    )

  return [confirmationDialog, confirm ]
}