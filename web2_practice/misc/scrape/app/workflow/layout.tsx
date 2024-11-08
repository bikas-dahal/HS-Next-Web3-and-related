import React from 'react'
import {Separator} from "@/components/ui/separator";
import Logo from "@/components/Logo";
import {ModeToggle} from "@/components/ThemeModeToggle";

const Layout = ({ children }: {children: React.ReactNode}) => {
    return (
        <div className={'flex flex-col w-full h-screen'}>
            {children}
            <Separator />
            <footer className={'flex items-center justify-between px-6 py-4'}>
                <Logo iconSize={16} fontSize={'text-xl'} />
                <ModeToggle />
            </footer>
        </div>
    )
}
export default Layout
