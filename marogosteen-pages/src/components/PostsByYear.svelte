<script lang="ts">
    import type { CollectionEntry } from "astro:content";
    import Card from "./Card.svelte";
    import getSortedPosts from "@utils/getSortedPosts";

    export let year: number;
    export let posts: CollectionEntry<"blog">[];
    posts = getSortedPosts(posts);
</script>

<li class="my-6">
    <div class="flex flex-col sm:flex-row gap-6">
        <h3 class="basis-1/6 text-2xl sm:text-3xl font-bold">{year}</h3>
        <ul class="basis-5/6">
            {#each posts as post}
                <Card post={post} />
            {/each}
        </ul>
    </div>
</li>
