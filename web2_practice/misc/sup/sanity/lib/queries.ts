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

export const QUOTE_BY_AUTHOR_QUERY = defineQuery(`*[_type == 'quote' && author._ref == $id ] | order(_createdAt desc){
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

export const COMMENT_BY_QUOTE_ID_QUERY = defineQuery(`*[_type == 'comment' && quote._ref == $id ] | order(_createdAt desc){
    _id,
        comment,
        views,
        _createdAt,
        author -> {
            _id, name, username, image
        }
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

export const QUOTE_VIEWS_QUERY = defineQuery(`*[_type == 'quote' && _id == $id ][0]{
        _id, views
    }`)

export const AUTHOR_BY_GITHUB_ID_QUERY =defineQuery(`
    *[_type == 'author' && id == $id ][0] {
        _id, 
        id,
        name,
        username,
        email,
        image,  
        bio
 }
`)

export const AUTHOR_BY_ID_QUERY =defineQuery(`
    *[_type == 'author' && _id == $id ][0] {
        _id, 
        id,
        name,
        username,
        email,
        image,
        bio
 }
`)

export const PLAYLIST_BY_SLUG_QUERY =
    defineQuery(`*[_type == "playlist" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  select[]->{
    _id,
    _createdAt,
    title,
    slug,
    author->{
      _id,
      name,
      slug,
      image,
      bio
    },
    views,
    description,
    category,
    image,
    pitch
  }
}`);