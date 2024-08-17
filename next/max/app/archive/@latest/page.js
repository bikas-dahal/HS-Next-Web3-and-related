import {getLatestNews} from "@/lib/news";
import NewsList from "@/components/news-list";

export default function LatestPage()  {
    const latestNews = getLatestNews()

    return(
        <div>
            <h1>
                Latest News:
            </h1>
            <NewsList news={latestNews} />
        </div>
    )
}