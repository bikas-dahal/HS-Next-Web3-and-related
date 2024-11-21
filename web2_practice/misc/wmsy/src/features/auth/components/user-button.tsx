'use client'

import {useCurrent} from "@/features/auth/api/use-current";
import {Loader, LogOut} from "lucide-react";
import {Avatar, AvatarFallback} from "@/components/ui/avatar";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {Separator} from "@/components/ui/separator";
import {useLogout} from "@/features/auth/api/use-logout";

export const UserButton = () => {

    const {data: user, isLoading} = useCurrent()
    const {mutate: logout} = useLogout()

    if (isLoading) {
        return (
            <div
                className={'size-10 rounded-full flex items-center justify-center bg-neutral-100 border border-neutral-400'}>
                <Loader className={'size-5 animate-spin text-muted-foreground'}/>
            </div>
        )
    }

    if (!user) return null;

    const {name, email} = user

    const avatarFallback = name ? name.charAt(0).toUpperCase() : email.charAt(0).toUpperCase() ?? 'U'

    return (
        <DropdownMenu modal={false}>
            <DropdownMenuTrigger className={'outline-none relative'}>
                <Avatar className={'size-10 hover:opacity-75 transition border border-neutral-400'}>
                    <AvatarFallback
                        className={'bg-neutral-200 font-semibold text-neutral-500 flex items-center justify-center'}>
                        {avatarFallback}
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className={'w-60'} align={"end"} side={"bottom"} sideOffset={10}>
                <div className={'flex flex-col justify-center items-center px-2.5 py-4'}>
                    <Avatar className={'size-[52px] border border-neutral-400'}>
                        <AvatarFallback
                            className={'bg-neutral-200 font-medium text-xl text-neutral-500 flex items-center justify-center'}>
                            {avatarFallback}
                        </AvatarFallback>
                    </Avatar>
                    <div className={'flex flex-col items-center justify-center'}>
                        <p className={'text-sm font-medium text-neutral-900'}>
                            {name || 'User'}
                        </p>
                        <p className={'text-xs text-neutral-500'}>
                            {email}
                        </p>
                    </div>
                    <Separator className={'my-1'}/>
                    <DropdownMenuItem
                        onClick={() => logout()}
                        className={'h-10 flex items-center justify-center text-amber-800 font-medium cursor-pointer'}
                    >
                        <LogOut className={'size-5 mr-2'}/>
                        Logout
                    </DropdownMenuItem>
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

