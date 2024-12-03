'use server'

import {auth} from "@/auth";
import {parseServerActionResponse} from "@/lib/utils";
import slugify from "slugify";
import {writeClient} from "@/sanity/lib/write-client";


export const createComment = async (state: any, form: FormData) => {
    const session = await auth()
    const quoteId = form.get('quoteId') as string

    if (!session) {
        return parseServerActionResponse({
            error: 'Not signed in',
            status: 'ERROR'
        })
    }

    const { comment } = Object.fromEntries(form)

    try {
        const commentData = {
            _type: 'comment',
            comment: comment as string,
            quote: {
                _type: 'reference',
                _ref: quoteId
            },
            author: {
                _type: 'reference',
                _ref: session?.id
            }
        }

        const result = await writeClient.create(commentData)

        return parseServerActionResponse({
            ...result,
            error: '',
            status: 'SUCCESS',
        })
    } catch (error) {
        console.error(error)
        return parseServerActionResponse({
            error: JSON.stringify(error),
            status: 'ERROR',
        })
    }
}

export const createPitch = async (state: any, form: FormData, pitch: string) => {
    const session = await auth()

    if (!session) {
        return parseServerActionResponse({
            error: 'Not signed in',
            status: 'ERROR'
        })
    }

    const { title, description, category, link } = Object.fromEntries(
        Array.from(form).filter(([key]) => key !== 'pitch')
    )

    const slug = slugify(title as string, {lower: true, strict: true})

    try {
        const quote = {
            title,
            description,
            category,
            image: link,
            slug: {
                _type: slug,
                current: slug
            },
            author: {
                _type: 'reference',
                _ref: session?.id
            },
            pitch

        }

        const result = await writeClient.create({
            _type: 'quote',
            ...quote,
        })

        return parseServerActionResponse({
            ...result,
            error: '',
            status: 'SUCCESS',
        })

    } catch (e) {
        console.log(e)

        return parseServerActionResponse({
            error: JSON.stringify(e),
            status: 'ERROR',
        })
    }

}