'use client'

import {Button} from "@/components/ui/button";
import {FcGoogle} from "react-icons/fc";
import {FaGithub} from "react-icons/fa";

export const Social = () => {
    return(
        <div className='flex items-center justify-center gap-x-2 w-full'>
            <Button className={'w-full'} variant={'outline'} size={'lg'} onClick={() => {}}>
                <FcGoogle className={'h-5 w-5'} />
            </Button>
            <Button className={'w-full'} variant={'outline'} size={'lg'} onClick={() => {}}>
                <FaGithub className={'h-5 w-5'} />
            </Button>
        </div>
    )
}