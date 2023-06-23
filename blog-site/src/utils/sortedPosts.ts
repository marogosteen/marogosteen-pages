import type { CollectionEntry } from "astro:content"

const sortedPosts = (posts: CollectionEntry<"blog">[]) => {
    return posts
        .filter(({ data }) => !data.draft)
        .sort((a, b) =>
            b.data.publicDate.getTime() - a.data.publicDate.getTime()
        )
}

export default sortedPosts