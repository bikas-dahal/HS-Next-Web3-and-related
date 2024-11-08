'use client'

import Image from "next/image";
import {Button} from "@/components/ui/button";
import {usePathname} from "next/navigation";
import Link from "next/link";

interface AuthLayoutProps {
    children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {

    const pathname = usePathname()
    const isSignIn = pathname === '/sign-in'

    return (
        <main className={'bg-neutral-100 min-h-screen'}>
            <div className={'mx-auto max-w-screen-2xl p-4'}>
                <nav className={'flex items-center justify-between'}>
                    <Image src={'./logo.svg'} alt={'logo'} width={'56'} height={56} />
                    <div className={'flex items-center gap-2'}>
                        <Button asChild variant={'secondary'}>
                            <Link href={isSignIn ? 'sign-up' : 'sign-in'}>
                                {isSignIn ? 'Sign up' : 'Login'}
                            </Link>
                        </Button>
                    </div>
                </nav>
                <div className={'flex items-center justify-between flex-col pt-6 md:pt-12'}>

            {children}
                </div>
            </div>
        </main>
    )
}

export default AuthLayout;

