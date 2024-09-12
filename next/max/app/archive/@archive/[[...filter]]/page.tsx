import NewsList from "@/components/news-list";
import {getAvailableNewsMonths, getAvailableNewsYears, getNewsForYear, getNewsForYearAndMonth} from "@/lib/news";
import Link from "next/link";

export default function FilteredNewsPage({ params }) {
    const filter = params.filter
    const selectedYear = filter?.[0];
    const selectedMonth = filter?.[1];

    let news;
    let links = getAvailableNewsYears();

    if (selectedYear && !selectedMonth) {
        news = getNewsForYear(selectedYear);

        links = getAvailableNewsMonths(selectedYear)
    }

    if (selectedYear && selectedMonth) {
        news = getNewsForYearAndMonth(selectedYear, selectedMonth)
        links = []
    }

    let newsContent = <p>No news found for the selected Period</p>

    if (news && news.length) {
        newsContent = <NewsList news={news} />;
    }

    if (
        (selectedYear && !getAvailableNewsYears().includes(+selectedYear)) ||
        (selectedMonth && !getAvailableNewsMonths(selectedYear).includes(selectedMonth))
    ) {
        throw new Error('Invalid Filter')
    }

    return(
        <>
        <header>
            <nav>
                <ul className='flex flex-wrap gap-6 m-5 '>
                     {links.map ((link) => {
                         const href = selectedYear
                             ? `/archive/${selectedYear}/${link}`
                             : `/archive/${link}`;

                         return(
                         <li key={link}
                            className='border-amber-300 border rounded-full p-2 hover:text-blue-500 text-2xl'>
                                <Link href={href}>{link}</Link>
                            </li>
                        )
                     })}
                    </ul>
                </nav>
            </header>
        {newsContent}
        </>
    )
}