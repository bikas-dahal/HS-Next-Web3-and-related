import {DUMMY_NEWS} from "@/dummy-news";
import Link from "next/link";
import Image from "next/image";

export default function NewsList({ d }) {
    return (
        <ul className='flex flex-wrap items-center gap-5 justify-evenly '>
            {DUMMY_NEWS.map((d) => (
                <li key={d.id}>
                    <Link href={`/news/${d.slug}`}>
                        <Image src={`/images/news/${d.image}`} alt={d.title} width={300} height={300}/>
                        <span>{d.title}</span>
                    </Link>
                </li>
            ))}
        </ul>
    )
}