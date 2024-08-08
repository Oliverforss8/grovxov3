import { type SchemaTypeDefinition } from "sanity";
import { blogPostType } from "./post";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blogPostType],
};
