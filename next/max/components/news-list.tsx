import {DUMMY_NEWS} from "@/dummy-news";
import Link from "next/link";
import Image from "next/image";

export default function NewsList({ news }) {
    return (
        <ul className='flex flex-wrap items-center gap-5 justify-evenly '>
            {news.map((d) => (
                <li key={d.id}>
                    <Link href={`/news/${d.slug}`}>
                        <Image className='rounded-xl hover:p-1.5 ' src={`/images/news/${d.image}`} alt={d.title} width={300} height={300}/>
                        <div className='p-2 border bg-blue-100 m-4 hover:p-1.5 hover:bg-blue-300 rounded-full text-black'>{d.title}</div>
                    </Link>
                </li>
            ))}
        </ul>
    )
}