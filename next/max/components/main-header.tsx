'use client'
import Link from "next/link";
import {usePathname} from "next/navigation";

export default function MainHeader() {
    const path = usePathname()
    let ll;
    if (path.startsWith('/news')) {
        ll = <li className='bg-blue-100 hover:p-1.5 hover:bg-blue-300 text-black rounded p-1 m-1'>
            <Link href='/archive'>Archive</Link>
        </li>
    } else {
        ll = <li className='bg-blue-100 hover:p-1.5 hover:bg-blue-300 text-black rounded p-1 m-1'>
            <Link href='/news/'>News</Link>
        </li>
    }
    console.log(path)
    // console.log()
    return (
        <header className='text-xl flex justify-between m-8 border-b-blue-400 '>
            <div>
            <Link className='bg-blue-100 hover:bg-blue-300 text-black rounded p-1 m-1 hover:p-1.5' href='/'>Home</Link>
            </div>
            <h2 className='bg-pink-300 p-2 rounded-2xl text-black font-bold text'>Next News</h2>
            <nav>

            <ul className='flex'>
                { ll}
            </ul>
            </nav>
        </header>
    )
}