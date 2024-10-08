'use client'

import Image from "next/image";
import {DUMMY_NEWS} from "@/dummy-news";
import {notFound} from "next/navigation";
import {useRouter} from "next/router";

export default function InterceptedImagePage({params}) {
    const router = useRouter();

    const newsItemSlug = params.slug;
    const newsItem = DUMMY_NEWS.find((news) => news.slug === newsItemSlug);

    if (!newsItem) {
        notFound()
    }

    return (
        <>
        <div className='backdrop-blur' onClick={router.back}/>
            <dialog className='model' open>
                <div>
                    <Image src={`/images/news/${newsItem.image }`} alt={newsItem.title} width={full} height={500} />
                </div>
            </dialog>
        </>
    )
}