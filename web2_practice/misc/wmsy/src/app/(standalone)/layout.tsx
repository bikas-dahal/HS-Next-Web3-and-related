import { UserButton } from "@/features/auth/components/user-button"
import Image from "next/image"
import Link from "next/link"

interface StandaloneLayoutProps {
    children: React.ReactNode
}

 const StandaloneLayout = ({children}: StandaloneLayoutProps) => {
    return (
        <div className="min-h-screen bg-neutral-200">
            <div className="mx-auto px-4  max-w-screen-xl h-full">
                <nav className="flex justify-between items-center h-[73px]">
                    <Link href='/'>
                        <Image src={'./logo.svg'} alt="logo" width={50} height={50} />
                    </Link>
                    <UserButton />
                </nav>
                <main className="h-full items-center justify-center py-8 px-6 flex flex-col">
                    {children}
                </main>
            </div>
        </div>
    )
} 

export default StandaloneLayout