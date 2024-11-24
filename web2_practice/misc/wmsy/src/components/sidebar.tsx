import Link from "next/link"
import Image from "next/image"
import { Separator } from "./ui/separator"
import { Navigation } from "./navigation"
import { WorkspaceSwitcher } from "./workspace-switcher"
import { Project } from "./projects"

export const Sidebar = () => {
    return (
        <aside className="h-full bg-gray-100 p-4 w-full">
            <Link href={'/'}>
                <Image src={'/logo.jpg'} alt="logo" className="rounded-md" width={60} height={30} />
            </Link>
            <Separator className="my-3" />
            <WorkspaceSwitcher />
            <Separator className="my-3" />
            <Navigation />
            <Separator />
            <Project />
        </aside>
    )
}