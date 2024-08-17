import {getAvailableNewsYears} from "@/lib/news";
import Link from "next/link";

export default function ArchivePage()  {

    const links = getAvailableNewsYears()
    console.log(links)
    return(
        <header>
            <nav>
                <ul className='flex flex-wrap gap-6 m-5 '>
                    {links.map(link => (
                        <li key={link} className='border-amber-300 border rounded-full p-2 hover:text-blue-500 text-2xl'>
                            <Link href={`/archive/${link}`}>{link}</Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    )
}