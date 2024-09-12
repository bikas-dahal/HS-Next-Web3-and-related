// Not done for now for my different approach


'use client'

import {usePathname} from "next/navigation";
import Link from "next/link";

export default function NavLinks ({ href, children}) {
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

    return(
        <Link href={href} ></Link>
    )
}