import Link from "next/link"
import Image from "next/image"
import { Separator } from "./ui/separator"
import { Navigation } from "./navigation"

export const Sidebar = () => {
    return (
        <aside className="h-full bg-gray-100 p-4 w-full">
            <Link href={'/'}>
                <Image src={'./logo.svg'} alt="logo" width={50} height={50} />
            </Link>
            <Separator className="my-3" />
            <Navigation />
        </aside>
    )
}