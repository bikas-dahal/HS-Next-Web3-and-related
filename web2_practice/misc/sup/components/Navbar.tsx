import React from 'react'
import Link from "next/link";
import Image from "next/image";
import {auth, signIn, signOut} from "@/auth";

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
                            <Link href={'/startup/create'}><span>Create</span></Link>
                            <form action={async () => {
                                'use server'
                                await signOut({
                                    redirectTo: '/'
                                })
                            }
                            }><button type={'submit'}>Logout</button></form>
                            <Link href={`/user/${session?.id}`}><span>{session?.user?.name}</span></Link>
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
