import SearchForm from "@/components/SearchForm";
import PhilosophyCard from "@/components/PhilosophyCard";
import {client} from "@/sanity/lib/client";
import {STARTUPS_QUERY} from "@/sanity/lib/queries";

import {PhilosophyTypeCard} from "@/components/PhilosophyCard";

export default async function Home({searchParams}: {searchParams: Promise<{ query?: string }>}) {



    const query = (await searchParams).query

    const posts = await client.fetch(STARTUPS_QUERY)

    console.log(JSON.stringify(posts, null, 2));

    // const posts = [{
    //     _createdAt: new Date(),
    //     views: 14,
    //     author: {
    //         _id: 20,
    //         name: 'JohnprasadLuitel'
    //     },
    //     _id: 38,
    //     description: "Let's go",
    //     image: 'https://plus.unsplash.com/premium_photo-1719894748846-81e016253702?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    //     category: 'kabir',
    //     title: 'Ram Ram sab Kahe'
    // }]

  return (
      <>
        <section className={'pink_container'}>
          <h1 className={'heading'}>
            Pitch your quote...<br />Connect with Philosophers 🔓
          </h1>
            <p className={'sub-heading !max-w-3xl'}>
                Submit your take, Vote on opinions and Get noticed in virtual Wisdom
            </p>
            <SearchForm query={query} />
        </section>
          <section className={'section_container'}>
              <p className={'text-30-semibold'}>
                  {query ? `Search results for ${query}` : 'All Quotes'}
              </p>
              <ul className={'mt-6 card_grid'}>
                  {posts?.length > 0 ? (
                      posts.map((post: PhilosophyTypeCard, index: number) => (
                        <PhilosophyCard key={post?._id} post={post} />
                      ))
                  ): (
                      <p className={'no-results'}>No wisdom found...</p>
                  )}
              </ul>
          </section>
      </>
  );
}
