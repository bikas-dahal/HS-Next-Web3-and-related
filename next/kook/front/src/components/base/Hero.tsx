import Image from "next/image";
import {Button} from "@/components/ui/button";
import Link from "next/link";

export default function Hero() {
    return (
        <div className='w-full h-screen flex flex-col items-center justify-center'>
            <div>
                <Image src='/hfff.svg' alt='just a picture' width={600} height={600} />
            </div>
            <div className='text-center'>
                <h1 className='text-6xl bg-gradient-to-r from-pink-500 to-purple-700 text-transparent bg-clip-text font-bold'>Kook</h1>
                <p className='text-2xl font-bold text-center'>Let's Kook something together...</p>
                <Link href='/login'>
                    <Button className='bg-gradient-to-r from-pink-500 to-purple-700 text-black mt-2 text-xl'>Start Free</Button>
                </Link>
            </div>
        </div>
    )
}