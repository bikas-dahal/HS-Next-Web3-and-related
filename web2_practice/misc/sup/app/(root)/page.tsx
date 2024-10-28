import SearchForm from "@/components/SearchForm";

export default async function Home({searchParams}: {searchParams: Promise<{ query?: string }>}) {

    const query = (await searchParams).query

  return (
    <section className={'pink_container'}>
      <h1 className={'heading'}>
        Pitch your quote...<br />Connect with Philosophers 🔓
      </h1>
        <p className={'sub-heading !max-w-3xl'}>
            Submit your take, Vote on opinions and Get noticed in virtual Wisdom
        </p>
        <SearchForm query={query} />
    </section>
  );
}
