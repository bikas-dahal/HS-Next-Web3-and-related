import React from 'react'
import Link from "next/link";
import Image from "next/image";
import {auth, signIn, signOut} from "@/auth";
import {BadgePlus, LogOut} from "lucide-react";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";

const Navbar = async () => {

    const session = await auth()

    return (
        <header className={'px-6 py-3 shadow-sm font-work-sans'}>
            <nav className={'flex justify-between items-center'}>
                <Link href={'/web2_practice/misc/sup/public'}>
                    <Image src={'/dh.png'} alt={'logo'} width={20} height={20} />
                </Link>

                <div className={'flex gap-5 items-center bg-white text-black'}>
                    {session && session?.user ? (
                        <>
                            <Link href={'/quote/create'}><span className={'max-sm:hidden'}>Create</span>
                                <BadgePlus className={'size-5 sm:hidden'} />
                            </Link>
                            <form action={async () => {
                                'use server'
                                await signOut({
                                    redirectTo: '/'
                                })
                            }
                            }>
                                <button type={'submit'}>
                                    <span className={'max-sm:hidden'}>Logout</span>
                                    <LogOut className={'size-5 sm:hidden text-red-500'} />
                                </button>
                            </form>

                            <Link href={`/user/${session?.id}`}>
                                <Avatar className={'size-10'} >
                                    <AvatarImage src={session?.user?.image || ''} alt={session?.user?.name || ''} />
                                    <AvatarFallback>AV</AvatarFallback>
                                </Avatar>
                                {/*<span>{session?.user?.name}</span>*/}
                            </Link>
                        </>
                    ) : <>
                        <form action={async () => {
                            'use server'
                            await signIn('github')
                        }}>
                            <button type={'submit'}><span className={''}>Login</span></button>
                        </form>
                    </>}
                </div>
            </nav>
        </header>
    )
}
export default Navbar
