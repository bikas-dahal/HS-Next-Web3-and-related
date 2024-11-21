import { UserButton } from "@/features/auth/components/user-button"
import MobileSidebar from "./mobile-sidebar"

export const Navbar = () => {
    return (
        <nav className="pt-4 px-6 flex items-center justify-between">
            <div className="flex-col hidden lg:flex">
                <h1 className="font-semibold text-2xl">
                    Home
                </h1>
                <p className="text-sm text-gray-500">
                    Monitor all of your tasks and projects here
                </p>
            </div>
            <MobileSidebar />
            <UserButton /> 
        </nav>
    )
}