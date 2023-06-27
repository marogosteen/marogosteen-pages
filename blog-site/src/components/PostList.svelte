<script lang="ts">
    import type { CollectionEntry } from "astro:content";
    import PostsByYear from "./PostsByYear.svelte";

    export let title: string;
    export let posts: CollectionEntry<"blog">[];

    const postsByYearMap: Map<number, CollectionEntry<"blog">[]> = new Map();
    posts.forEach((post) => {
        let year = post.data.publicDate.getFullYear();
        postsByYearMap.set(year, (postsByYearMap.get(year) || []).concat(post));
    });
</script>

<h2 class="text-3xl font-bold my-10 sm:text-5xl">{title}</h2>
<ul>
    {#each Array.from(postsByYearMap) as item}
        <PostsByYear year={item[0]} posts={item[1]} />
    {/each}
</ul>
