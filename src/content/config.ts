import { z, defineCollection } from "astro:content";

// 2. Define a `type` and `schema` for each collection
const sectionsCollection = defineCollection({
  type: "content", // v2.5.0 and later
  schema: z.object({
    title: z.string(),
    color: z.string(),
    tips: z.array(
      z.object({
        heading: z.string(),
        description: z.string(),
        icon: z.string().optional(),
      }),
    ),
  }),
});

export const collections = {
  sctions: sectionsCollection,
};
