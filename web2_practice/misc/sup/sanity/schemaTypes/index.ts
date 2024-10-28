import { type SchemaTypeDefinition } from 'sanity'
import {author} from "@/sanity/schemaTypes/author";
import {quote} from "@/sanity/schemaTypes/quote";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [author, quote],
}
