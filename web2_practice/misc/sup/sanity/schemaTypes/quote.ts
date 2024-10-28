import {defineField, defineType} from "sanity";
import {UserIcon} from "@sanity/icons";

export const quote = defineType({
    name: "quote",
    title: "Quote",
    type: 'document',
    icon: UserIcon,
    fields: [
        defineField({
            name: "title",
            type: "string"
        }),
        defineField({
            name: "slug",
            type: "slug",
            options: {
                source: 'title'
            }
        }),
        defineField({
            name: "author",
            type: "reference",
            to: {
                type: 'author'
            }
        }),
        defineField({
            name: "views",
            type: "number"
        }),
        defineField({
            name: "description",
            type: "text"
        }),
        defineField({
            name: "image",
            type: "url"
        }),
        defineField({
            name: "pitch",
            type: "markdown"
        }),
        defineField({
            name: "category",
            type: "string",
            validation: (Rule) => Rule.min(2).max(20).required().error('Please provide a category.')
        }),
    ],
})