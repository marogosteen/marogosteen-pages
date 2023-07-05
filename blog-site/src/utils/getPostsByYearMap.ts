import type { CollectionEntry } from "astro:content";

const getPostsByYearMap = (
    posts: CollectionEntry<"blog">[]
): Map<number, CollectionEntry<"blog">[]> => {
    const postsByYearMap: Map<number, CollectionEntry<"blog">[]> =
        new Map();
    posts.forEach((post) => {
        let year = post.data.publicDate.getFullYear();
        postsByYearMap.set(
            year,
            (postsByYearMap.get(year) || []).concat(post)
        );
    });
    return postsByYearMap;
};

export default getPostsByYearMap;