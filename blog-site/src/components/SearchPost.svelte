<script lang="ts">
    import type { CollectionEntry } from "astro:content";
    import PostList from "@components/PostList.svelte";

    let query = "";
    export let allPosts: CollectionEntry<"blog">[];
    let searchResult: CollectionEntry<"blog">[] = [];

    const searchHandler = () => {
        searchResult = allPosts.filter((post) => {
            return (
                post.data.title.includes(query) ||
                post.data.description.includes(query) ||
                post.body.includes(query)
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
