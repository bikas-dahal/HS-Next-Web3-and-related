import SideNav from "@/app/ui/dashboard/sidenav"; // Ensure this path is correct

export const experimental_ppr = true;

export default function Layout({children}: {children: React.ReactNode}) {
    return (
        <div className='flex h-screen flex-col md:flex-row'>
            <div className='h-16 w-full flex-none bg-gray-50 md:h-full md:w-64'>
                <SideNav />
            </div>
            <div className='flex-grow p-3 m-24 md:m-0 md:overflow-y-auto md:p-12 bg-white'>
                {children}
            </div>
        </div>
    );
}
