import { Poppins } from "next/font/google";

import { cn } from '@/lib/utils'

const font = Poppins({
    subsets: ['latin'],
    weight: '600'
})

interface HeaderProps {
    label: string
    h: string
}

export const Header = ({label, h}: HeaderProps) => {
    return (
        <div className={'w-full items-center justify-center flex flex-col gap-y-4'}>
            <h1 className={cn('text-3xl font-semibold', font.className)}> {h}</h1>
            <p className='text-muted-foreground text-sm'>{label}</p>
        </div>
    )
}