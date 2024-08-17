
import { DUMMY_NEWS } from "@/dummy-news";
import NewsList from "@/components/news-list";

const NewsPage = () => {

    return (

            <div className='text-cyan-400'>
                <NewsList news={DUMMY_NEWS} />
            </div>
    )
}

export default NewsPage