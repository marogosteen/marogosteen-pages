<script lang="ts">
    import type { CollectionEntry } from "astro:content";
    import PostsByYear from "./PostsByYear.svelte";

    export let title: String;
    export let posts: CollectionEntry<"blog">[];

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
</script>

<h2 class="text-3xl font-bold my-10">{title}</h2>
<ul>
    {#each Array.from(getPostsByYearMap(posts)).sort((a, b) => b[0] - a[0]) as item}
        <PostsByYear year={item[0]} posts={item[1]} />
    {/each}
</ul>
