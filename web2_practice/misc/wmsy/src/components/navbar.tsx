'use client'

import { UserButton } from "@/features/auth/components/user-button"
import MobileSidebar from "./mobile-sidebar"
import { usePathname } from "next/navigation"

const pathnameMap = {
    'tasks': {
        title: 'My Tasks',
        description: 'Monitor all of your tasks here'
    },
    'projects': {
        title: 'My Projects',
        description: 'Monitor all of your projects here'
    },
}


const defaultMap = {
    title: 'Home',
    description: 'Monitor all of your tasks and projects here'
}

export const Navbar = () => {

    const pathname = usePathname()

    const pathnameParts = pathname.split('/') 
    const pathnameKey = pathnameParts[3] as keyof typeof pathnameMap

    const { title, description } = pathnameMap[pathnameKey] || defaultMap

    return (
        <nav className="pt-4 px-6 flex items-center justify-between">
            <div className="flex-col hidden lg:flex">
                <h1 className="font-semibold text-2xl">
                    {title}
                </h1>
                <p className="text-sm text-gray-500">
                    {description}
                </p>
            </div>
            <MobileSidebar />
            <UserButton /> 
        </nav>
    )
}