import { z } from "astro:content";

export const blogSchema = z.object({
  title: z.string(),
  publicDate: z.date(),
  updateDate: z.date(),
  postSlug: z.string(),
  tags: z.array(z.string()).default(["others"]),
  description: z.string(),
  draft: z.boolean().optional()
})
