import Image from "next/image";
import {DUMMY_NEWS} from "@/dummy-news";
import {notFound} from "next/navigation";


const DetailNewsPage = ({ params }) => {
    const slug = params.slug;
    const newsItem = DUMMY_NEWS.find((newsItem => newsItem.slug === slug) )
    console.log(newsItem)
    if (!newsItem) {
        notFound()
    }

    return (
        <article className='m-10 '>
            <header>
                <Image src={`/images/news/${newsItem.image}`} width={300} height={200} alt={newsItem.title}/>
                <h1 className='text-3xl font-bold leading-tight my-5'>
                    {newsItem.title}
                </h1>
                <time dateTime={newsItem.date}>{newsItem.date}</time>
            </header>
            <p className='text-cyan-400 mt-5'>
                {newsItem.content}
            </p>
        </article>
    )
}

export default DetailNewsPage