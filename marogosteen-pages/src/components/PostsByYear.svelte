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
        <p class="w-18 text-xl sm:text-2xl font-bold">{year}</p>
        <ul>
            {#each posts as post}
                <Card post={post} />
            {/each}
        </ul>
    </div>
</li>
