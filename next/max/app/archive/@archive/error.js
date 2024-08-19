'use client'

import Link from "next/link";

export default function FilterErrorPage({error}) {
    return(
        <div className='m-10 text-center'>
            <h1>Error Occurred</h1>
            <p className='underline-offset-1 underline rounded-r p-2'>{error.message}</p>
            <h6>
                <Link className='text-black hover:text-blue-500 border  border-amber-50 p-1 bg-amber-100 hover:bg-amber-400 rounded-full' href='/archive/'>Go to archive Page</Link>
            </h6>
        </div>
    )
}