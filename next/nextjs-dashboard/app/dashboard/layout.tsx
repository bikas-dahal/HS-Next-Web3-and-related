import SideNav from "@/app/ui/dashboard/sidenav";

export default function Layout({children}: {children: React.ReactNode}) {
    return (
        <div className='flex h-screen flex-col '>
            <div className='h-full w-full flex-none md:w-64'>
                <SideNav />
            </div>
            <div className='flex-grow p-6 md:overflow-y-auto md:p-12'>
                {children}
            </div>
        </div>
    )
}