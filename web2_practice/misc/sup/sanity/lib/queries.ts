import {defineQuery} from "groq";

export const STARTUPS_QUERY = defineQuery(`*[_type == 'quote' && defined(slug.current) && !defined($search) || title match $search || category match $search || author->name match $search ] | order(_createdAt desc){
  _id, 
    title, 
    views, 
    slug, 
    image, 
    _createdAt, 
    author -> {
      _id, name, username, image, bio
    },
    description, 
    category,
    
}`)

export const QUOTE_BY_ID_QUERY = defineQuery(`*[_type == 'quote' && _id == $id ][0]{
    _id,
        title,
        views,
        slug,
        image,
        _createdAt,
        author -> {
            _id, name, username, image, bio
        },
        description,
        category,
        pitch
}`)