import {defineField, defineType} from "sanity";
import {UserIcon} from "@sanity/icons";

export const comment = defineType({
    name: "comment",
    title: "Comment",
    type: 'document',
    fields: [
        defineField({
            name: "comment",
            type: "string"
        }),
        defineField({
            name: "author",
            type: "reference",
            to: {
                type: 'author'
            }
        }),
        defineField({
            name: "quote",
            type: "reference",
            to: {
                type: 'quote'
            }
        }),
        defineField({
            name: "views",
            type: "number"
        }),
       
    ],
})