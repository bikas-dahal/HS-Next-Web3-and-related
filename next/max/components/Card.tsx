import Link from "next/link";



const Card = ({ title }) => {
    return (
        <div className='bg-amber-100 text-cyan-400 border-gray-200 rounded-xl flex items-center justify-center'>

            <Link href='/news'>
                <div className='text-xl font-bold text-green-500 dark:text-green-700'>
                    {title}
                </div>

            </Link>
        </div>
)
}

export default Card