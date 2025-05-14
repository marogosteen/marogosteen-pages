<script lang="ts">
    import type { CollectionEntry } from "astro:content";
    import PostsByYear from "./PostsByYear.svelte";
    import getSortedPosts from "@utils/getSortedPosts";
    import getPostsByYearMap from "@utils/getPostsByYearMap";

    export let allPosts: CollectionEntry<"blog">[];

    let query = "";
    let searchResult: CollectionEntry<"blog">[] = [];

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
        currentPage: number,
    ): CollectionEntry<"blog">[] => {
        currentPage = currentPage;
        const start = currentPage * cardMaxDisplay;
        const end = (currentPage + 1) * cardMaxDisplay;
        return getSortedPosts(posts.slice(start, end));
    };

    const searchHandler = () => {
        let lq = query.toLowerCase();
        displayPosts = allPosts.filter((post) => {
            return (
                post.data.title.toLowerCase().includes(lq) ||
                post.data.description.toLowerCase().includes(lq) ||
                post.body.toLowerCase().includes(lq)
            );
        });
    };

    let currentPage = 0;
    $: paginationPages = getPager(currentPage);
    $: displayPosts = getDisplayPosts(allPosts, currentPage);
</script>

<div class="flex flex-col w-full">
    <div class="flex w-full mb-8 rounded-lg py-2 bg-gray-700">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-search my-auto mx-3"
            viewBox="0 0 16 16"
        >
            <path
                d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"
            ></path>
        </svg>

        <input
            id="search-box"
            type="text"
            on:change={searchHandler}
            bind:value={query}
            class="input text-lg px-5 w-full focus:outline-none"
        />
    </div>

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
                <button
                    class="px-2 my-6 border-x"
                    on:click={() => (currentPage = page)}
                >
                    {page + 1}
                </button>
            {/if}
        {/each}
    </div>
</div>
