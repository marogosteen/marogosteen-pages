<script lang="ts">
    import type { CollectionEntry } from "astro:content";
    import PostsByYear from "./PostsByYear.svelte";
    import getSortedPosts from "@utils/getSortedPosts";
    import getPostsByYearMap from "@utils/getPostsByYearMap";

    export let title: String;
    export let allPosts: CollectionEntry<"blog">[];

    allPosts = getSortedPosts(allPosts);
    const pagerMaxSize = 7;
    const pagerHalfSize = Math.floor(pagerMaxSize / 2);
    const cardMaxDisplay = 16;
    const maxPage = Math.ceil(allPosts.length / cardMaxDisplay);

    const getPager = (currentPage: number): number[] => {
        let shift = currentPage - pagerHalfSize;
        shift = Math.min(shift, maxPage - pagerMaxSize);
        shift = Math.max(shift, 0);

        const size = Math.min(maxPage, pagerMaxSize);
        return size > 1 ? [...Array(size)].map((_, i) => i + shift) : [];
    };

    const getDisplayPosts = (
        posts: CollectionEntry<"blog">[],
        currentPage: number
    ): CollectionEntry<"blog">[] => {
        currentPage = currentPage;
        const start = currentPage * cardMaxDisplay;
        const end = (currentPage + 1) * cardMaxDisplay;
        return getSortedPosts(posts.slice(start, end));
    };

    let currentPage = 0;
    $: paginationPages = getPager(currentPage);
    $: displayPosts = getDisplayPosts(allPosts, currentPage);
</script>

<div class="flex flex-col w-full">
    <h2 class="text-3xl font-bold my-10">{title}</h2>
    <div class="join flex justify-center">
        {#each paginationPages as page}
            {#if page === currentPage}
                <button
                    class="pager-btn pointer-events-none"
                    on:click={() => (currentPage = page)}
                >
                    {page + 1}
                </button>
            {:else}
                <button class="pager-btn" on:click={() => (currentPage = page)}>
                    {page + 1}
                </button>
            {/if}
        {/each}
    </div>
    <div class="grow">
        <ul>
            {#each Array.from(getPostsByYearMap(displayPosts)).sort((a, b) => b[0] - a[0]) as item}
                <PostsByYear year={item[0]} posts={item[1]} />
            {/each}
        </ul>
    </div>
    <div class="join flex justify-center">
        {#each paginationPages as page}
            {#if page === currentPage}
                <button
                    class="px-2 my-6 border-x pointer-events-none"
                    on:click={() => (currentPage = page)}
                >
                    {page + 1}
                </button>
            {:else}
                <button class="px-2 my-6 border-x" on:click={() => (currentPage = page)}>
                    {page + 1}
                </button>
            {/if}
        {/each}
    </div>
</div>
