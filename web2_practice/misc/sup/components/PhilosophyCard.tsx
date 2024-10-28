import React from 'react'
import {formatDate} from "@/lib/utils";
import {EyeIcon} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import {Button} from "@/components/ui/button";
import {Author, Quote} from "@/sanity/types";

export type PhilosophyTypeCard = Omit<Quote, 'author'> & { author?: Author };

const PhilosophyCard = ({post}: {post: PhilosophyTypeCard}) => {

    const { _createdAt, views, author, title, category, _id, image, description } = post;

    return (
        <li className={'startup-card group'}>
            <div className={'flex-between'}>
                <p className={'startup-card_date'}>
                    {formatDate(_createdAt)}
                </p>
                <div className={'flex gap-1.5'}>
                    <EyeIcon className={'size-5 text-primary'} />
                    <span className={'text-16-medium'}>{views}</span>
                </div>
            </div>

            <div className={'flex-between mt-5 gap-5'}>
                <div className={'flex-1'}>
                    <Link href={`/user/${author?._id}`}>
                        <p className={'text-16-medium line-clamp-1'}>{author?.name}</p>
                    </Link>
                    <Link href={`/quotes/${_id}`}>
                        <h3 className={'text-26-semibold line-clamp-1'}>{title}</h3>
                    </Link>
                </div>
                <Link href={`/user/${author?._id}`}>
                    <Image src={'https://placehold.co/48x48'} alt={'placeholder'} width={48} height={48} className={'rounded-full'} />
                </Link>
            </div>
            <Link href={`/quotes/${_id}`}>
                <p className={'startup-card_desc'}>{description}</p>
                <img src={image} alt={'placeholder'} className={'startup-card_img'} />
            </Link>

            <div className={'flex-between gap-5 mt-5'}>
                <Link href={`/?query=${category?.toLowerCase()}`}>
                    <p className={'text-16-medium line-clamp-1'}>{category}</p>
                </Link>
                <Button className={'startup-card_btn'} asChild>
                    <Link href={`/quotes/${_id}`}>
                        Details
                    </Link>
                </Button>
            </div>
        </li>
    )
}
export default PhilosophyCard
