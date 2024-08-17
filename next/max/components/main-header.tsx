import Link from "next/link";

export default function MainHeader() {
    return (
        <header className='text-xl flex justify-between m-8 border-b-blue-400 '>
            <div>
                <Link href='/'>Home</Link>
            </div>
            <nav>

            <ul>
                <li>
                    <Link href='/news/recently-added'>Recently Added</Link>
                </li>
                <li>
                    <Link href='/news/all-news'>All News</Link>
                </li>
            </ul>
            </nav>
        </header>
    )
}