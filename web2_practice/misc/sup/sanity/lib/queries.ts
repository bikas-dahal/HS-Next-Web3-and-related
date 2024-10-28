import {defineQuery} from "groq";

export const STARTUPS_QUERY = defineQuery(`*[_type == 'quote' && defined(slug.current)] | order(_createdAt desc){
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