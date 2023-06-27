<script lang="ts">
    import type { CollectionEntry } from "astro:content";
    import PostList from "@components/PostList.svelte";

    let query = "";
    export let allPosts: CollectionEntry<"blog">[];
    let searchResult: CollectionEntry<"blog">[] = [];

    const searchHandler = () => {
        let lq = query.toLowerCase();
        searchResult = allPosts.filter((post) => {
            return (
                post.data.title.toLowerCase().includes(lq) ||
                post.data.description.toLowerCase().includes(lq) ||
                post.body.toLowerCase().includes(lq)
            );
        });
    };
</script>

<div class="flex justify-center my-10">
    <label for="search-box" class="text-3xl font-bold my-auto me-4">Search: </label>

    <input
        id="search-box"
        type="text"
        on:change={searchHandler}
        bind:value={query}
        class="input rounded-lg py-2 bg-gray-500 w-full text-lg px-5"
    />
</div>

<PostList title={""} posts={searchResult} />
