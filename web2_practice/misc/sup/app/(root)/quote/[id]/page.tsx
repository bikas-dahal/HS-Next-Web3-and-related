import React, {Suspense} from 'react'
import {client} from "@/sanity/lib/client";
import {COMMENT_BY_QUOTE_ID_QUERY, PLAYLIST_BY_SLUG_QUERY, QUOTE_BY_ID_QUERY} from "@/sanity/lib/queries";
import {notFound} from "next/navigation";
import {formatDate} from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import markdownit from 'markdown-it'
import {Skeleton} from "@/components/ui/skeleton";
import View from "@/components/View";
import PhilosophyCard, {PhilosophyTypeCard} from "@/components/PhilosophyCard";
import { auth } from '@/auth';
import { CommentForm } from '@/components/CommentForm';
import {sanityFetch, SanityLive} from "@/lib/live";



export const experimental_ppr = true

const md = markdownit()



const Page = async ({ params }: { params: Promise<{id: string}>}) => {
    const id = (await params).id

    const session = await auth()


    const [post,  {select: editorPosts }] = await Promise.all([
        client.fetch(QUOTE_BY_ID_QUERY, { id }),
        client.fetch(COMMENT_BY_QUOTE_ID_QUERY, { id }),
        client.fetch(PLAYLIST_BY_SLUG_QUERY, {slug: 'editor-s-picks'})
    ])

    // const comments = await client.fetch(COMMENT_BY_QUOTE_ID_QUERY, { id })

    const {data: comments } = await sanityFetch({query: COMMENT_BY_QUOTE_ID_QUERY, params: {id}})




    // Parallel and sequential data fetching...

    // const post = await client.fetch(QUOTE_BY_ID_QUERY, { id })
    //
    // const {select: editorPosts } = await client.fetch(PLAYLIST_BY_SLUG_QUERY, {slug: 'editor-s-picks'})

    if (!post) {
        notFound()
    }

    const parsedContent = md.render(post?.pitch || '')

    console.log(comments);
    

    return (
        <>
            <section className={'pink_container !min-h-[230px]'}>
                <p className={'tag'}>
                    {formatDate(post?._createdAt)}
                </p>
                <h1 className={'heading'}>{post?.title}</h1>
                <p className={'sub-heading !max-w-5xl'}>{post.description}</p>
            </section>

            <section className={'section_container'}>
                <img src={post.image} alt={post.title} className={'w-[80vw] h-[90vh] rounded-xl'} />
                <div className={'space-y-5 mt-10 max-w-4xl mx-auto'}>
                    <div className={'flex-between gap-5'}>
                        <Link href={`/user/${post.author?._id}`} className={'flex gap-2 items-center mb-3'}>
                            <Image src={post.author?.image} alt={'avatar'} width={64} height={64} className={'rounded-full drop-shadow-lg'} />
                            <div>
                                <p className={'text-20-medium'}>{post.author.name}</p>
                                <p className={'text-16-medium !text-black-300'}>@{post.author.username}</p>
                            </div>
                        </Link>

                        <p className={'category-tag'}>{post.category}</p>
                    </div>
                    <h3 className={'text-30-bold'}>
                        Main Idea 🌞
                    </h3>
                    {parsedContent ? (
                        <article className={'prose max-w-4xl font-work-sans break-all'}
                            dangerouslySetInnerHTML={{ __html: parsedContent }}
                        />
                    ) : (
                        <p className={'no-result'}>No details provided. 😔</p>
                    )}
                </div>

                <hr className='divider' />

                <section className={'section_container'}>
                {/* Comments Section */}
                <div className={'max-w-4xl mx-auto'}>
                    <h3 className={'text-30-bold mb-5'}>Comments</h3>
                    
                    {/* Comment Form - Only show if user is logged in */}
                    {session && (
                        <div className={'mb-6'}>
                            <CommentForm quoteId={id} />
                        </div>
                    )}

                    {/* Comments List */}
                    {comments.length > 0 ? (
                        <ul className={'space-y-4'}>
                            {comments.map((comment: any) => (
                                <li 
                                    key={comment._id} 
                                    className={'bg-gray-50 p-4 rounded-lg'}
                                >
                                    <div className={'flex items-center gap-3 mb-2'}>
                                        <Image 
                                            src={comment.author?.image} 
                                            alt={comment.author?.name} 
                                            width={40} 
                                            height={40} 
                                            className={'rounded-full'}
                                        />
                                        <div>
                                            <p className={'font-semibold'}>{comment.author?.name}</p>
                                            <p className={'text-xs text-gray-500'}>
                                                {formatDate(comment._createdAt)}
                                            </p>
                                        </div>
                                    </div>
                                    <p>{comment.comment}</p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className={'text-center text-gray-500'}>
                            No comments yet. Be the first to comment!
                        </p>
                    )}
                </div>
            </section>

                {/* comments form and existing comments */}

                <hr className={'divider'} />

                {editorPosts?.length > 0 && (
                    <div className={'max-w-4xl mx-auto'}>
                        <p className={'text-30-semibold'}>Editor Picks</p>
                        <ul className={'mt-7 card_grid-sm'}>
                            {editorPosts.map((post: PhilosophyTypeCard, index: number) => (
                                <PhilosophyCard post={post} key={index} />
                            ))}
                        </ul>
                    </div>
                )}

            {/*    TODO recommendation */}

            </section>
                      <SanityLive />


<Suspense fallback={<Skeleton className={'view_skeleton'} />}>
    <View id={id} />
</Suspense>
        </>
    )
}
export default Page

