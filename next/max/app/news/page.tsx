import Link from "next/link";

const NewsPage = () => {
    return (
        <>
            <div className='flex items-center justify-evenly text-cyan-400'>

            <Link href='/news/recently-added/'>
                Recent News
            </Link>
                <ul>
                    <li className='flex flex-col items-center justify-center gap-5'>

                <Link href='/news/ktm-npl'>
                News abobut ktm npl
                </Link>
                    </li>
                    <li className='flex flex-col items-center justify-center gap-5'>
                        <Link href='/news/ktm-npl'>
                            News abobut ktm npl
                        </Link>
                    </li>
                </ul>
            </div>
            This will provide news here
        </>
    )
}

export default NewsPage