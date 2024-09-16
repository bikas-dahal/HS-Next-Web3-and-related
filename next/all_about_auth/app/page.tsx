import {Button} from "@/components/ui/button";
import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils"
import {LoginButton} from "@/components/auth/login-button";

const font = Poppins({
    subsets: ['latin'],
    weight: '600'
})

export default function Home() {
  return (
      <main className='flex flex-col items-center h-full justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-300 to-pink-700'>
        <div className='space-y-6 text-center'>
            <h1 className={cn('text-4xl font-semibold drop-shadow-lg text-slate-100', font.className)}>🛅 Auth</h1>
            <p className='text-2xl font-bold text-center'>Simple auth Service</p>
            <div>
                <LoginButton>

                <Button variant='secondary' size='lg'>Login</Button>
                </LoginButton>

            </div>
        </div>
      </main>
    );
}
