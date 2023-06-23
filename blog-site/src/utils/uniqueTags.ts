import type { CollectionEntry } from "astro:content";

const uniqueTags = (posts: CollectionEntry<"blog">[]) => {
    let tags: Map<string, number> = new Map<string, number>();
    posts.forEach(({ data }) => {
        if (!data.draft) {
            data.tags.forEach((tag) => {
                tags.set(tag, (tags.get(tag) || 0) + 1)
            })
        }
    });

    return tags
}

export default uniqueTags;