import React from 'react'
import {client} from "@/sanity/lib/client";
import {QUOTE_BY_AUTHOR_QUERY} from "@/sanity/lib/queries";
import PhilosophyCard, {PhilosophyTypeCard} from "@/components/PhilosophyCard";

const UserInsights = async ({id}: {id: string}) => {

    const quotes = await client.fetch(QUOTE_BY_AUTHOR_QUERY, {id})

    return (
        <div className='grid md:grid-cols-2 md:w-[50rem] gap-5 '>
            {quotes.length > 0 ? (
                quotes.map((quote: PhilosophyTypeCard) => (
                    <PhilosophyCard key={quote._id} post={quote} />
                ))
            ) : (
                <p className={'no-result'}>No insights yet.</p>
            )}
        </div>
    )
}
export default UserInsights
