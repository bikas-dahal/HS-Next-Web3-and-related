import Link from 'next/link'
import Image from 'next/image'
import {Button} from "@/components/ui/button";

export default function NotFound() {
    return (
        <div className='h-screen flex flex-col items-center justify-center'>
            <Image src='/404.svg' width={500} height={500} alt='404'/>
            <Button><Link href="/">Return Home</Link></Button>
        </div>
    )
}