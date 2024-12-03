import React from 'react'
import QuoteForm from "@/components/QuoteForm";
import {auth} from "@/auth";
import {redirect} from "next/navigation";

const Page = async () => {

    const session = await auth()

    if (!session) {
        redirect('/')
    }

    return (
        <>
            <section className={'pink_container !min-h-[230px]'}>
                <h1 className={'heading'}>Submit your Insight...</h1>
            </section>
            <div className=''>
            <QuoteForm />

            </div>
        </>
    )
}
export default Page
