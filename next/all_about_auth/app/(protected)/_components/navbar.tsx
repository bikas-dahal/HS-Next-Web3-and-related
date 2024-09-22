'use client'

import {usePathname} from "next/navigation";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {UserButton} from "@/components/auth/user-button";

export const Navbar = () => {

    const pathname = usePathname()

    return (
        <nav className={'bg-secondary flex justify-between items-center p-4 rounded-md w-[600px] shadow-md text-black'}>
            <div className='flex items-center justify-between gap-x-2'>
    <Button asChild variant={pathname === '/server' ? 'default' : 'outline'}>
    <Link href={'/server'}>
        Server
    </Link>
    </Button>
    <Button asChild variant={pathname === '/client' ? 'default' : 'outline'}>
    <Link href={'/client'}>
        Client
    </Link>
    </Button>
    <Button asChild variant={pathname === '/admin' ? 'default' : 'outline'}>
    <Link href={'/admin'}>
        Admin
    </Link>
    </Button>
    <Button asChild variant={pathname === '/settings' ? 'default' : 'outline'}>
    <Link href={'/settings'}>
        Settings
    </Link>
    </Button>
            </div>
            <p>
                <UserButton />
            </p>
        </nav>
    )
}