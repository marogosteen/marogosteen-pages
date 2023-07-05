<script lang="ts">
    import type { CollectionEntry } from "astro:content";
    import PostsByYear from "./PostsByYear.svelte";
    import getSortedPosts from "@utils/getSortedPosts";
    import getPostsByYearMap from "@utils/getPostsByYearMap";

    export let title: String;
    export let allPosts: CollectionEntry<"blog">[];

    allPosts = getSortedPosts(allPosts);
    const pagerDisplayMaxSize = 7;
    const cardDisplay = 5;
    const pageTotal =
        allPosts.length % cardDisplay > 0
            ? Math.floor(allPosts.length / cardDisplay) + 1
            : Math.floor(allPosts.length / cardDisplay);

    const getPager = (currentPage: number, pageCount: number): number[] => {
        const start = Math.max(
            currentPage - Math.floor(pagerDisplayMaxSize / 2),
            0
        );
        const last = Math.min(currentPage + pagerDisplayMaxSize, pageCount);
        return [...Array(last - start)].map((_, i) => i + start);
    };

    const paginationHandler = (page: number) => {
        alert("click");
        currentPage = page;
        paginationPages = getPager(currentPage, pageTotal);
        const start = currentPage * cardDisplay;
        const end = (currentPage + 1) * cardDisplay;
        displayPosts = allPosts.slice(start, end);
    };

    let currentPage = 0;
    let paginationPages = getPager(currentPage, pageTotal);
    const start = currentPage * cardDisplay;
    const end = (currentPage + 1) * cardDisplay;
    let displayPosts = allPosts.slice(start, end);
</script>

<div class="flex flex-col w-full">
    <h2 class="text-3xl font-bold my-10">{title}</h2>
    <div class="join flex justify-center">
        {#each paginationPages as page}
            {#if page === currentPage}
                <button
                    class="pager-btn pointer-events-none"
                    on:click={() => paginationHandler(page)}
                >
                    {page + 1}
                </button>
            {:else}
                <button
                    class="pager-btn"
                    on:click={() => paginationHandler(page)}
                >
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
                    class="pager-btn pointer-events-none"
                    on:click={() => paginationHandler(page)}
                >
                    {page + 1}
                </button>
            {:else}
                <button
                    class="pager-btn"
                    on:click={() => paginationHandler(page)}
                >
                    {page + 1}
                </button>
            {/if}
        {/each}
    </div>
</div>

<style>
    .pager-btn {
        @apply px-2 my-6 border-x;
    }
</style>
