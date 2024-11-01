import {defineField, defineType} from "sanity";
import {UserIcon} from "@sanity/icons";

export const playlist = defineType({
    name: "playlist",
    title: "Playlists",
    type: 'document',
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
            name: "select",
            type: "array",
            of: [{type: 'reference', to: [{type: 'quote'}]}]
        }),
    ],
})