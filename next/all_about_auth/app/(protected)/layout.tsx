import React from 'react';
import {Navbar} from "@/app/(protected)/_components/navbar";

interface ProtectedLayoutProps {
    children: React.ReactNode;
}

function Layout({ children }: ProtectedLayoutProps) {
    return (
        <div className={'h-full w-full flex flex-col gap-y-10 items-center justify-center bg-emerald-500'}>
            <Navbar />
            {children}
        </div>
    );
}

export default Layout;