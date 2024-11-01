import { type SchemaTypeDefinition } from 'sanity'
import {author} from "@/sanity/schemaTypes/author";
import {quote} from "@/sanity/schemaTypes/quote";
import {playlist} from "@/sanity/schemaTypes/playlist";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [author, quote, playlist],
}
