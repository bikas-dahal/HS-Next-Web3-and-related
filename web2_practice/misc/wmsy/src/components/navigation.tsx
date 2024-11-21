import { cn } from "@/lib/utils"
import Link from "next/link"
import { GoHome, GoListOrdered, GoListUnordered, GoGear, GoPeople, GoCheckCircle } from "react-icons/go"
import { GoHomeFill } from "react-icons/go"
import { GoCheckCircleFill } from "react-icons/go"
const routes = [
    {
        label: 'Home',
        href: '/',
        icon: GoHome,
        activeIcon: GoHomeFill
    },
    {
        label: 'My Tasks',
        href: '/tasks',
        icon: GoCheckCircle,
        activeIcon: GoCheckCircleFill
    },
    {
        label: 'Settings',
        href: '/settings',
        icon: GoGear,
        activeIcon: GoGear
    },
    {
        label: 'Members',
        href: '/members',
        icon: GoPeople,
        activeIcon: GoPeople
    }
]

export const Navigation = () => {
    return (
        <ul className="flex flex-col gap-y-2">
            {routes.map((route) => {
                const isActive = false
                const Icon = isActive ? route.activeIcon : route.icon

                return (
                    <Link key={route.href} href={route.href}>
                        <div 
                            className={cn(
                                'flex items-center gap-2.5 p-2.5 rounded-md font-medium hover:text-primary transition text-gray-500', 
                                isActive && 'bg-white shadow-sm hover:opacity-100 text-primary')}
                        >
                            <Icon className="size-5 text-gray-500" />
                            <span className="text-sm font-medium">{route.label}</span>
                        </div>
                    </Link>
                )
            })}
        </ul>
    )
}