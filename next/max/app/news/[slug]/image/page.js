import Image from "next/image";
import {DUMMY_NEWS} from "../../../../dummy-news";
import {notFound} from "next/navigation";

export default function ImagePage({params}) {
    const newsItemSlug = params.slug;
    const newsItem = DUMMY_NEWS.find((news) => news.slug === newsItemSlug);

    if (!newsItem) {
        notFound()
    }

    return (
        <div>
            <Image src={`/images/news/${newsItem.image }`} alt={newsItem.title} width={500} height={500} />
        </div>
    )
}