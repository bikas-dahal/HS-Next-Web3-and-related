'use client'

import {Button} from "@/components/ui/button";
import {FcGoogle} from "react-icons/fc";
import {FaGithub} from "react-icons/fa";
import {signIn} from "next-auth/react";
import {DEFAULT_LOGIN_REDIRECT} from "@/routes";

export const Social = () => {

    const onClick = (provider: "google" | "github" ) => {
        console.log('check')
        signIn(provider, {
            callbackUrl: DEFAULT_LOGIN_REDIRECT
        }).then(r => {
            return r;
        })
    }

    return(
        <div className='flex items-center justify-center gap-x-2 w-full'>
            <Button className={'w-full'} variant={'outline'} size={'lg'} onClick={() => onClick("google")}>
                <FcGoogle className={'h-5 w-5'} />
            </Button>
            <Button className={'w-full'} variant={'outline'} size={'lg'} onClick={() => onClick('github')}>
                <FaGithub className={'h-5 w-5'} />
            </Button>
        </div>
    )
}