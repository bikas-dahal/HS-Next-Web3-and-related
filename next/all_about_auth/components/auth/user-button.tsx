'use client'

import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {FaRegUser, FaUser} from "react-icons/fa";
import {useCurrentUser} from "@/hooks/use-current-user";
import LogoutButton from "@/components/auth/logout-button";
import {ExitIcon} from "@radix-ui/react-icons";

export const UserButton = () => {

    const user = useCurrentUser()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Avatar>
                    <AvatarImage src={ ''}>
                        <AvatarFallback className={'bg-sky-400'}>
                            <FaUser className={'text-white'} />
                        </AvatarFallback>
                    </AvatarImage>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className={'w-40'} align={'end'}>
                <LogoutButton>
                    <DropdownMenuItem>
                        <ExitIcon className={'h-4 m-4 mr2'} />
                        Logout
                    </DropdownMenuItem>
                </LogoutButton>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}