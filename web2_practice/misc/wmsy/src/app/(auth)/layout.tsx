import Image from "next/image";
import {Button} from "@/components/ui/button";

interface AuthLayoutProps {
    children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
    return (
        <main className={'bg-neutral-100 min-h-screen'}>
            <div className={'mx-auto max-w-screen-2xl p-4'}>
                <nav className={'flex items-center justify-between'}>
<Image src={'./logo.svg'} alt={'logo'} width={'56'} height={56} />
                    <div className={'flex items-center gap-2'}>
                        <Button variant={'secondary'}>Sign Up</Button>
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

