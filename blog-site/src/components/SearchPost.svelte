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

<input
    type="text"
    placeholder=" Search..."
    on:change={searchHandler}
    bind:value={query}
    class="input rounded-lg py-2 text-xl bg-gray-500"
/>

<p>forcus 設定したい</p>

<PostList title={"Search: " + query} posts={searchResult} />
