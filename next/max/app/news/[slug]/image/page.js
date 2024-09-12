import Image from "next/image";
import {DUMMY_NEWS} from "@/dummy-news";
import {notFound} from "next/navigation";

export default function ImagePage({params}) {
    const newsItemSlug = params.slug;
    const newsItem = DUMMY_NEWS.find((news) => news.slug === newsItemSlug);

    if (!newsItem) {
        notFound()
    }

    return (
        <div>
            <Image
                src={`/images/news/${newsItem.image }`}
                alt={newsItem.title}
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: 'auto', height: '100%' }}
            />
        </div>
    )
}