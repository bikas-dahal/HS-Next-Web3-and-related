import Link from "next/link";

export default function MainHeader() {
    return (
        <header>
            <ul>
                <li>
                    <Link href='/news/recently-added'>Recently Added</Link>
                </li>
                <li>
                    <Link href='/news/all-news'>All News</Link>
                </li>
            </ul>
        </header>
    )
}