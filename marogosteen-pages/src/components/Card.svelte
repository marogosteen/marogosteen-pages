<script lang="ts">
    import type { CollectionEntry } from "astro:content";
    import dateToString from "@utils/dateToString";

    export let post: CollectionEntry<"blog">;
</script>

<li class="mb-12">
    <a href={"/posts/" + post.data.postSlug}>
        <h3 class="text-lg sm:text-2xl">{post.data.title}</h3>
    </a>
    <div class="text-gray-400 ms-6 my-4">
        <div class="flex">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                class="bi bi-calendar inline-block"
                viewBox="0 0 16 16"
            >
                <path
                    d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"
                />
            </svg>
            <span class="items-center justify-center mx-4"
                >{dateToString(post.data.publicDate)}</span
            >
        </div>
        <p>{post.data.description}</p>
        {#each post.data.tags as tag}
            <a href={"/tags/" + tag}>
                <span class="me-2">#{tag}</span>
            </a>
        {/each}
    </div>
</li>
